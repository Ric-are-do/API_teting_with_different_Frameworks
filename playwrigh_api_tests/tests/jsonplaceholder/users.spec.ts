import { test, expect } from '@playwright/test';
import { UserSchema, UsersSchema } from './Schemas/users.schema';

test('jsonplaceholder - get all users', async ({request}) => {
    const response = await request.get('/users');
    expect(response.status()).toBe(200);

    const body = await response.json();
    const result = UsersSchema.safeParse(body); // pass in the users schema to validate the response body against the schema we defined for the users, this will check if the response body has the correct structure and data types as defined in the schema, if the validation fails it will return an error object with details about the validation errors, if it passes it will return an object with a success property set to true and a data property containing the validated data.
    expect(result.success).toBe(true); // this will check if the response body matches the schema we defined for the users, if the validation fails it will return false and the test will fail, if it passes it will return true and the test will pass.

    expect(body.length).toBe(10);

})


test('jsonplaceholder - get one users', async ({request}) => {
    const response = await request.get('/users/10');
    expect(response.status()).toBe(200);

    const body = await response.json();
    const result = UserSchema.safeParse(body); // pass in the user schema to validate the response body against the schema we defined for a single user, this will check if the response body has the correct structure and data types as defined in the schema, if the validation fails it will return an error object with details about the validation errors, if it passes it will return an object with a success property set to true and a data property containing the validated data.
    expect(result.success).toBe(true); // this will check if the response body matches the schema we defined for a single user, if the validation fails it will return false and the test will fail, if it passes it will return true and the test will pass.
    
    expect(body.name).toBe('Clementina DuBuque');
    expect(body.username).toBe('Moriah.Stanton');
    expect(body.email).toBe('Rey.Padberg@karina.biz');
    expect(body.address.street).toBe("Kattie Turnpike")

})

test('jsonplaceholder - negative test - get non-existent user', async ({request}) => {
    const response = await request.get('/users/9999');
    expect(response.status()).toBe(404);
});