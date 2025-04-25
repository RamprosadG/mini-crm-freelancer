import z from "zod";

const createClientSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    company: z.string().optional(),
    notes: z.string().optional(),
    userId: z.string(),
  }),
});

const updateClientSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
    notes: z.string().optional(),
    userId: z.string().optional(),
  }),
});

export { createClientSchema, updateClientSchema };
