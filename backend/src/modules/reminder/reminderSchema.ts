import z from "zod";

const createReminderSchema = z.object({
  body: z.object({
    title: z.string(),
    dueDate: z.date(),
    description: z.string().optional(),
    isCompleted: z.boolean().optional(),
    clientId: z.string().optional(),
    projectId: z.string().optional(),
  }),
});

const updateReminderSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    dueDate: z.date().optional(),
    description: z.string().optional(),
    isCompleted: z.boolean().optional(),
    clientId: z.string().optional(),
    projectId: z.string().optional(),
  }),
});

export { createReminderSchema, updateReminderSchema };
