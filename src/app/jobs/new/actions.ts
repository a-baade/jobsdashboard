"use server";

import { slugify } from "@/lib/utils";
import { createJobsSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function createJobPost(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw Error("Unauthorized");
  }

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
      userId: userId as string,
    },
  });

  redirect("/");
}
