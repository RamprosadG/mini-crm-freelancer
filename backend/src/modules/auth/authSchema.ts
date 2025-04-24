import z from "zod";

const loginSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

const registerSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
  }),
});

export { loginSchema, registerSchema };
