import { z } from "zod";

export const registerSchema = z.object({
  nombre_usuario: z.string({
    required_error: "name is required",
  }),
  email_usuario: z.string({
    required_error: "email is required",
  }),
  password: z.string({
    required_error: "password is required",
  }),
});

export const loginSchema = z.object({
  email_usuario: z.string({
    required_error: "email is required",
  }),
  password: z.string({
    required_error: "password is required",
  }),
});
