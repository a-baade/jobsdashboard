import "./globals.css";
import JobsFilterSideBar from "@/components/jobsFilter";
import { JobsFilterValues } from "@/lib/validation";
import JobResults from "@/components/jobResults";
import Link from "next/link";
import PostNewJobSideBar from "@/components/postNewJob";
import NotLoggedIn from "@/components/notLoggedIn";
import { Metadata } from "next";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";
import { User } from "next-auth";

interface PageProps {
  searchParams: {
    query?: string;
    type?: string;
    status?: string;
    location?: string;
    remote?: string;
    hybrid?: string;
    onSite?: string;
    page?: string;
  };
}

function dynamicTitle({
  query,
  type,
  status,
  location,
  remote,
  hybrid,
  onSite,
}: JobsFilterValues) {
  const prefix = query
    ? `${query} Jobber`
    : type
      ? `${query} Jobber`
      : status
        ? `${type} Jobber`
        : remote
          ? `${remote} Jobber`
          : hybrid
            ? `${hybrid} Jobber`
            : onSite
              ? `${onSite} Jobber`
              : `Mine Applikasjoner`;

  const suffix = location ? ` i ${location}` : "";

  return `${prefix}${suffix}`;
}

export function generateMetadata({
  searchParams: { query, status, type, location, remote, hybrid, onSite },
}: PageProps): Metadata {
  return {
    title: `${dynamicTitle({
      query,
      type,
      location,
      status,
      remote: remote === "true",
      hybrid: hybrid === "true",
      onSite: onSite === "true",
    })} | Mine Applikasjoner`,
  };
}

export default async function Home({
  searchParams: { query, type, status, location, remote, hybrid, onSite, page },
}: PageProps) {
  const filterValues: JobsFilterValues = {
    query,
    type,
    status,
    location,
    remote: remote === "true",
    hybrid: hybrid === "true",
    onSite: onSite === "true",
  };
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return <NotLoggedIn />;
  }

  return (
    <>
      <main className="retro-container m-auto my-10 max-w-6xl space-y-10 bg-primary-dark px-3">
        <Navbar />
        <div className="space-y-5 text-center">
          <h1 className="text-md text-4xl font-extrabold tracking-tight text-custom-primary lg:text-5xl">
            <Link href="/">{dynamicTitle(filterValues)}</Link>
          </h1>
        </div>
        <section className="flex flex-col gap-4 md:flex-row">
          <JobsFilterSideBar defaultValues={filterValues} />
          <JobResults
            filterValues={filterValues}
            page={page ? parseInt(page) : undefined}
          />
          <PostNewJobSideBar />
        </section>
      </main>
    </>
  );
}
