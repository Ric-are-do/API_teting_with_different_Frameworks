import {z} from 'zod';

export const CommentSchema = z.object({    // validates a single object
    postId: z.number(),
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    body: z.string()
});

export const CommentsSchema = z.array(CommentSchema); // validates an array of objects (note the diffenrt const names)