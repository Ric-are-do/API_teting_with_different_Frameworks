import  {z} from 'zod';

export const TodoSchema = z.object({  // For one object
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    completed: z.boolean()
});

export const TodosSchema = z.array(TodoSchema); // For array of objects (note the different const names)

