"use server";
import prisma from "@/lib/prisma";
import { updateJobsSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateJobPost(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const {
    title,
    companyName,
    type,
    status,
    locationType,
    location,
    description,
  } = updateJobsSchema.parse(values);

  try {
    const values = Object.fromEntries(formData.entries());
    console.log("Parsed values:", values);

    const validatedData = updateJobsSchema.parse(values);
    console.log("Validated data:", validatedData);

    const jobId = parseInt(formData.get("jobId") as string);
    console.log("Job ID:", jobId);

    if (isNaN(jobId)) {
      throw new Error("Invalid job ID");
    }

    const updatedJob = await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        title: validatedData.title,
        companyName: validatedData.companyName,
        type: validatedData.type,
        status: validatedData.status,
        locationType: validatedData.locationType,
        location: validatedData.location,
        description: validatedData.description,
      },
    });

    console.log("Updated job:", updatedJob);

    revalidatePath("/");
    //redirect("/");
  } catch (error) {
    console.error("Error updating job:", error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}
