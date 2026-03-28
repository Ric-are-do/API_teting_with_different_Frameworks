import { test, expect, request } from '@playwright/test';

/// create tests for jsonplaceholder and tmdb using the baseURL defined in the playwright.config.ts file

test('jsonplaceholder - get posts', async ({request}) => {
  const response = await request.get('/posts');
  expect(response.status()).toBe(200);
}
);

