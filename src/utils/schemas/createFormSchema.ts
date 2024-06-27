import { z } from "zod";

export enum FormType {
  TEXT = "text",
  VIDEO = "video",
}

const LOGO_IMG_FILE_MAX_SIZE = 1024 * 1024 * 1;

export const createFormSchema = z.object({
  logoImgFile: z
    .custom<File>((file) => (file ? file instanceof File : true))
    .optional()
    .refine((file) => (file ? file.size < LOGO_IMG_FILE_MAX_SIZE : true), {
      message: "Please upload an image less than 5MB",
    }),
  headline: z.string().min(1),
  customMessage: z.string().min(1),
  accepts: z
    .array(z.nativeEnum(FormType))
    .refine((accepts) => accepts.length > 0, "Please select at least one type"),
  customColor: z.string(),
  customButtonMessage: z.string().min(1),
  customEndMessage: z.string().optional(),
  redirectUrl: z.string().url().optional(),
});

export type CreateFormValues = z.infer<typeof createFormSchema>;
