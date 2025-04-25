import z from "zod";

const createProjectSchema = z.object({
  body: z.object({
    title: z.string(),
    details: z.string().optional(),
    budget: z.number().optional(),
    deadline: z.string().datetime().optional(),
    status: z.string(),
    priority: z.string(),
    clientId: z.string(),
  }),
});

const updateProjectSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    details: z.string().optional(),
    budget: z.number().optional(),
    deadline: z.string().datetime().optional(),
    status: z.string().optional(),
    priority: z.string().optional(),
    clientId: z.string().optional(),
  }),
});

export { createProjectSchema, updateProjectSchema };
