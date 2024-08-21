import { z } from "zod";
import { locationTypes, types } from "./job-types";

const requiredString = z.string().min(1, "Required");
const numRequiredString = requiredString.regex(/^\d+$/, "Must be a number");
const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File size must be less than 2MB");

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or url required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type",
    ),
    location: z.string().max(100).max(100),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    },
  );

export const createJobsSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => types.includes(value),
      "Invalid Job-type",
    ),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    description: requiredString.max(5000).optional(),
    salary: numRequiredString
      .max(9, "Number too low for a wage slave")
      .optional(),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type CreateJobsValues = z.infer<typeof createJobsSchema>;

export const jobsFilterSchema = z.object({
  query: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
  hybrid: z.coerce.boolean().optional(),
  onSite: z.coerce.boolean().optional(),
});

export type JobsFilterValues = z.infer<typeof jobsFilterSchema>;

export const updateJobsSchema = z.object({
  jobId: numRequiredString.max(9).optional(),
  title: z.string().max(100).optional(),
  companyName: z.string().max(100).optional(),
  type: z
    .string()
    .refine((value) => types.includes(value), "Invalid Job-type")
    .optional(),
  locationType: z
    .string()
    .refine((value) => locationTypes.includes(value), "Invalid Location-type")
    .optional(),
  location: z.string().max(100).optional(),
  description: z.string().max(5000).optional(),
});

export type UpdateJobsValues = z.infer<typeof updateJobsSchema>;
