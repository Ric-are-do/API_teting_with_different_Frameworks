import { test, expect } from '@playwright/test';
import { PostSchema, PostsSchema } from './Schemas/post.schemas';

/// create tests for jsonplaceholder and tmdb using the baseURL defined in the playwright.config.ts file

test('jsonplaceholder - get posts', async ({request}) => {
  const response = await request.get('/posts');
  expect(response.status()).toBe(200);

  // Check Schemas for all obhects in the response (array of objects)
  const body  = await response.json();
  const result = PostsSchema.safeParse(body);
  

  console.log(body);
  expect(body.length).toBe(100);

}
);

test('jsonplaceholder - get single post', async ({request}) => {
  const response = await request.get("posts/9");
  expect(response.status()).toBe(200);

  // Check Schema for a single object in the response
  const body = await response.json();
  const result = PostSchema.safeParse(body);
  expect(result.success).toBe(true);
  expect(body.id).toBe(9)

});


test('jsonplaceholder - create and validate resource', async ({request}) => {
  
  // Plain JavaScript Object , The data we want to send 
  // NB Playwright will automatically serialize this object to JSON and set the appropriate headers for us when we make the request.
  const newPost = {
    title: 'foo',
    body: 'bar',
    userId: 1,
  };
  
   // This is how we send the post request and pass in the data we are sendng to the server.
   // We use the post method of the request object and pass in the endpoint and the data we want to send.
   // The http call is async, so we wait for the response and then we can validate the response status code to ensure that the resource was created successfully.
  const response = await request.post('/posts', { data: newPost }); 
  expect(response.status()).toBe(201); // remember on createing new resource the status code is 201 and not 200

  // Some additional tests 
  const body = await response.json();
  expect(body.title).toBe('foo');
  expect(body.body).toBe('bar');
  expect(body.userId).toBe(1);
  expect(body.id).toBeDefined(); // The server will sever a new ID 
  
}
);

test('jsonplaceholder - update resource', async ({request}) => {
  const updateResource =
  {
    title: 'Updated Title Value',
    body: 'Updated Body Value',
    userId: 2
  }

  // Ideally here we could get the request before and afte the update but since the responses are mocked we wont see the diff
  const response = await request.put('/posts/2', { data: updateResource });
  expect(response.status()).toBe(200);

  const body =await response.json();
  expect(body.title).toBe('Updated Title Value');
  expect(body.body).toBe('Updated Body Value');
  expect(body.userId).toBe(2);

})

test('jsonplaceholder - delete resource', async ({request}) => {
  const response = await request.delete('/posts/2');
  expect(response.status()).toBe(200); // This is a issue with the jsonplaceholder API, ideally the status code should be 204 for a successful delete operation, but since the responses are mocked we get a 200 status code instead.
});

test('jsonplaceholder - negative test - get non-existent post', async ({request}) => {
  const response = await request.get('/posts/9999');
  expect(response.status()).toBe(404);
});


