import "./globals.css";
import JobsFilterSideBar from "@/components/jobsFilter";
import { JobsFilterValues } from "@/lib/validation";
import JobResults from "@/components/jobResults";
import Link from "next/link";
import PostNewJobSideBar from "@/components/postNewJob";
import { Metadata } from "next";
import { useEffect } from "react";

interface PageProps {
  searchParams: {
    query?: string;
    type?: string;
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
  location,
  remote,
  hybrid,
  onSite,
}: JobsFilterValues) {
  const prefix = query
    ? `${query} Jobs`
    : type
      ? `${type} Jobs`
      : remote
        ? `${remote} Jobs`
        : hybrid
          ? `${hybrid} Jobs`
          : onSite
            ? `${onSite} Jobs`
            : "Mine Applikasjoner";

  const suffix = location ? ` in ${location}` : "";

  return `${prefix}${suffix}`;
}

export function generateMetadata({
  searchParams: { query, type, location, remote, hybrid, onSite },
}: PageProps): Metadata {
  return {
    title: `${dynamicTitle({
      query,
      type,
      location,
      remote: remote === "true",
      hybrid: hybrid === "true",
      onSite: onSite === "true",
    })} | Mine Applikasjoner`,
  };
}

export default async function Home({
  searchParams: { query, type, location, remote, hybrid, onSite, page },
}: PageProps) {
  const filterValues: JobsFilterValues = {
    query,
    type,
    location,
    remote: remote === "true",
    hybrid: hybrid === "true",
    onSite: onSite === "true",
  };
  return (
    <>
      <main className="retro-container m-auto my-10 max-w-6xl space-y-10 bg-primary-dark px-3">
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
