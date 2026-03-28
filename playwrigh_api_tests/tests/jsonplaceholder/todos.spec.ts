import {test , expect} from '@playwright/test';    
import { TodoSchema, TodosSchema } from './Schemas/todos.schemas';

test('jsonplaceholder - get all todos', async ({request}) => {
    const response = await request.get('/todos');
    expect(response.status()).toBe(200);

    // Schema check - Check a multiple  objects in a resonse ( array of objects )

    const body = await response.json();
    const result = TodosSchema.safeParse(body);
    expect(result.success).toBe(true);
    expect(body.length).toBe(200);
});


test( 'jsonplaceholder - get todos for a user', async ({request}) => {
    const response  = await request.get('/todos?id=3') // we can also use query params to filter the results and get the todos for a specific user
    expect(response.status()).toBe(200);

    // Schema check - Check a multiple  objects in a resonse ( no array )


    const body = await response.json();
    const result = TodoSchema.safeParse(body[0]); // since we are filtering by id we should get only one todo item in the response, so we can access the first item in the array to validate it against the schema we defined for a single todo item, this will check if the response body has the correct structure and data types as defined in the schema, if the validation fails it will return an error object with details about the validation errors, if it passes it will return an object with a success property set to true and a data property containing the validated data.
    expect(result.success).toBe(true);
    
    expect (body.length).toBe(1); // since we are filtering by id we should get only one todo item in the response
    expect(body[0].userId).toBe(1);// NB when searching using the filtering it returns an array of results even if there is only one item in the array, so we need to access the first item in the array to get the userId and completed status
    expect(body[0].completed).toBe(false);
});

test('jsonplaceholder - negative test - get non-existent todo', async ({request}) => {
    const response = await request.get('/todos/9999');
    expect(response.status()).toBe(404);
});