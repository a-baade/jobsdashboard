import { cache } from "react";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import JobDetails from "./JobDetails";
import { auth } from "@/lib/auth";

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
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  return (
    <main>
      <JobDetails job={job} jobId={job} />
    </main>
  );
}
