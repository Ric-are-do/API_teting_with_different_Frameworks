import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects:
  [
    {
      name: 'jsonplaceholder',
      testDir: 'tests/jsonplaceholder',
      use:{
        baseURL: 'https://jsonplaceholder.typicode.com'
      }
    },
    {
      name: 'tmdb',
      testDir: 'tests/tmdb',
      use:{
        baseURL: 'https://api.themoviedb.org/3',
        extraHTTPHeaders:{
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
      }
    }
  ]
});
