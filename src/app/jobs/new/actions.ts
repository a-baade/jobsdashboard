"use server";

import { slugify } from "@/lib/utils";
import { createJobsSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createJobPost(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const {
    title,
    type,
    status,
    companyName,
    companyLogo,
    location,
    locationType,
    applicationEmail,
    applicationUrl,
    salary,
    description,
  } = createJobsSchema.parse(values);

  const slug = `${slugify(title)}-${nanoid(10)}`;
  let companyLogoUrl: string | undefined = undefined;

  if (companyLogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access: "public",
        addRandomSuffix: false,
      },
    );
    companyLogoUrl = blob.url;
  }

  const safeSalary = salary ?? "0";

  await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      status,
      companyName: companyName.trim(),
      companyLogoUrl,
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      salary: parseInt(safeSalary),
      description: description?.trim(),

      approved: true,
    },
  });

  redirect("/");
}
