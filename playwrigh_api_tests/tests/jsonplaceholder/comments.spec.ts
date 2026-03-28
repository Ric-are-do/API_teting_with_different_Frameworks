import { test, expect } from '@playwright/test';
import { CommentSchema, CommentsSchema } from './Schemas/comments.schemas';

test('jsonplaceholder - get all comments ', async ({request}) => {
    const response = await request.get('/comments');
    expect(response.status()).toBe(200);

    // Schema check - Check a multiple  objects in a resonse ( No array ) 
    const body = await response.json();
    const result = CommentsSchema.safeParse(body); // pass in the comments schema to validate the response body against the schema we defined for the comments, this will check if the response body has the correct structure and data types as defined in the schema, if the validation fails it will return an error object with details about the validation errors, if it passes it will return an object with a success property set to true and a data property containing the validated data.
    expect(result.success).toBe(true); // this will check if the response body matches the schema we defined for the posts, if the validation fails it will return false and the test will fail, if it passes it will return true and the test will pass.
    expect(body.length).toBe(500);

});

test('jsonplaceholder - get comments for a post', async ({request}) => {
    const response = await request.get('comments/24');
    expect(response.status()).toBe(200);    
    
    const body = await response.json();

    // Schema check - Check a single object in a resonse ( No array ) 
    const result = CommentSchema.safeParse(body); // pass in the comment schema to validate the response body against the schema we defined for the comments, this will check if the response body has the correct structure and data types as defined in the schema, if the validation fails it will return an error object with details about the validation errors, if it passes it will return an object with a success property set to true and a data property containing the validated data.
    expect(result.success).toBe(true); // this will check if the response body matches the schema we defined for the posts, if the validation fails it will return false and the test will fail, if it passes it will return true and the test will pass.
    
    // Value checks 
    expect(body.id).toBe(24);
    expect(body.postId).toBeDefined();
    expect(body.name).toBeDefined();
    expect(body.email).toBeDefined();

    

}); 


test('jsonplaceholder - negative Test - get non-existent comment', async ({request}) => {
    const response = await request.get('comments/9999');
    expect(response.status()).toBe(404);
})