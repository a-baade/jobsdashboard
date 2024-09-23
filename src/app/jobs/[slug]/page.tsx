import { cache } from "react";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import JobDetails from "./JobDetails";
import { auth } from "@/lib/auth";
import getSession from "@/lib/getSession";

interface PageProps {
  params: { slug: string };
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  return job;
});

export async function generateStaticParams() {
  const jobs = await prisma?.job.findMany({
    where: { approved: true },
    select: { slug: true },
  });

  return jobs.map(({ slug }) => slug);
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const job = await getJob(slug);

  return {
    title: job.title,
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await getJob(slug);
  const session = await getSession();
  const user = session?.user;
  /* 
  if (!user || !user.id) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  // Check if the user owns the job
  if (job.userId !== user.id) {
    redirect("/404");
  } */
  return (
    <main>
      <JobDetails job={job} jobId={job} />
    </main>
  );
}
