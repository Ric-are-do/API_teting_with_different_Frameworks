import { z} from 'zod';

export const PostSchema = z.object({   // For one object
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    body: z.string()
});

export const PostsSchema = z.array(PostSchema); // For array of objects (note the different const names)