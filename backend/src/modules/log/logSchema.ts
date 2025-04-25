import z from "zod";

const createLogSchema = z.object({
  body: z.object({
    date: z.string().datetime(),
    interactionType: z.string(),
    notes: z.string().optional(),
    clientId: z.string().optional(),
    projectId: z.string().optional(),
  }),
});

const updateLogSchema = z.object({
  body: z.object({
    date: z.string().datetime().optional(),
    interactionType: z.string().optional(),
    notes: z.string().optional(),
    clientId: z.string().optional(),
    projectId: z.string().optional(),
  }),
});

export { createLogSchema, updateLogSchema };
