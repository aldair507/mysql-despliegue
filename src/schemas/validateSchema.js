import { z } from "zod";

// Esquema para el registro
export const registerSchema = z.object({
  nombre_usuario: z
    .string({ required_error: "El nombre de usuario es obligatorio" })
    .trim() // Elimina espacios en blanco al inicio y al final
    .min(1, "El nombre de usuario no puede estar vacío"), // Valida que no esté vacío
  email_usuario: z
    .string({ required_error: "El correo electrónico es obligatorio" })
    .trim()
    .email("Debe ser un correo electrónico válido"), // Valida el formato del correo
  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .trim()
    .min(6, "La contraseña debe tener al menos 6 caracteres") // Longitud mínima
    .max(20, "La contraseña no puede tener más de 20 caracteres"), // Longitud máxima
});

// Esquema para el inicio de sesión
export const loginSchema = z.object({
  email_usuario: z
    .string({ required_error: "El correo electrónico es obligatorio" })
    .trim()
    .email("Debe ser un correo electrónico válido"), // Valida el formato del correo
  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .trim()
    .min(6, "La contraseña debe tener al menos 6 caracteres") // Longitud mínima
    .max(20, "La contraseña no puede tener más de 20 caracteres"), // Longitud máxima
});
