import { z } from "zod";

// ─── Project Create Schema ───────────────────────────────────────────
export const projectCreateSchema = z.object({
  title: z
    .string()
    .min(1, "Title cannot be empty")
    .max(200, "Title must be under 200 characters"),

  slug: z
    .string()
    .min(1, "Slug cannot be empty")
    .max(200, "Slug must be under 200 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers, and hyphens only"
    ),

  clientName: z
    .string()
    .min(1, "Client name cannot be empty")
    .max(200, "Client name must be under 200 characters"),

  architect: z
    .string()
    .min(1, "Architect cannot be empty")
    .max(200, "Architect must be under 200 characters"),

  type: z
    .string()
    .min(1, "Type cannot be empty")
    .max(100, "Type must be under 100 characters"),

  location: z
    .string()
    .min(1, "Location cannot be empty")
    .max(300, "Location must be under 300 characters"),

  duration: z
    .string()
    .min(1, "Duration cannot be empty")
    .max(100, "Duration must be under 100 characters"),

  description: z
    .string()
    .min(1, "Description cannot be empty")
    .max(5000, "Description must be under 5000 characters"),

  coverImage: z
    .string()
    .url("Cover image must be a valid URL"),

  featured: z.boolean().optional().default(false),

  images: z
    .array(z.string().url("Each image must be a valid URL"))
    .optional()
    .default([]),
});

// ─── Project Update Schema (all fields optional) ────────────────────
export const projectUpdateSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title cannot be empty")
      .max(200, "Title must be under 200 characters")
      .optional(),

    slug: z
      .string()
      .min(1, "Slug cannot be empty")
      .max(200, "Slug must be under 200 characters")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must be lowercase letters, numbers, and hyphens only"
      )
      .optional(),

    clientName: z
      .string()
      .min(1, "Client name cannot be empty")
      .max(200, "Client name must be under 200 characters")
      .optional(),

    architect: z
      .string()
      .min(1, "Architect cannot be empty")
      .max(200, "Architect must be under 200 characters")
      .optional(),

    type: z
      .string()
      .min(1, "Type cannot be empty")
      .max(100, "Type must be under 100 characters")
      .optional(),

    location: z
      .string()
      .min(1, "Location cannot be empty")
      .max(300, "Location must be under 300 characters")
      .optional(),

    duration: z
      .string()
      .min(1, "Duration cannot be empty")
      .max(100, "Duration must be under 100 characters")
      .optional(),

    description: z
      .string()
      .min(1, "Description cannot be empty")
      .max(5000, "Description must be under 5000 characters")
      .optional(),

    coverImage: z.string().url("Cover image must be a valid URL").optional(),

    featured: z.boolean().optional(),

    images: z
      .array(z.string().url("Each image must be a valid URL"))
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
