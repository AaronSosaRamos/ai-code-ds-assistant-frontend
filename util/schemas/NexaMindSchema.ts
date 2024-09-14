import * as z from 'zod';

export const NexaMindSchema = z.object({
  imageUrl: z.string().url("Invalid URL").nonempty("URL is required"),
  requirements: z.string().min(10, "At least 10 characters are required"),
  language: z.enum(["en", "es", "fr", "de", "pt"]),
});
