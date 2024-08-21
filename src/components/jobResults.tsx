import { JobsFilterValues } from "@/lib/validation";
import JobListItem from "./jobListItem";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface JobResultsProps {
  filterValues: JobsFilterValues;
  page?: number;
}

export default async function JobResults({
  filterValues,
  page = 1,
}: JobResultsProps) {
  const { query, type, status, location, remote, hybrid, onSite } =
    filterValues;

  const jobsPerPage = 5;
  const skip = (page - 1) * jobsPerPage;

  const searchString = query
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { status: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      status ? { status } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      hybrid ? { locationType: "Hybrid" } : {},
      onSite ? { locationType: "On-site" } : {},
      { approved: true },
    ],
  };

  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: jobsPerPage,
    skip,
  });

  const pageCountPromise = prisma.job.count({ where });

  const [jobs, totalCount] = await Promise.all([jobsPromise, pageCountPromise]);

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <JobListItem job={job} key={job.id} />
      ))}
      {jobs.length === 0 && (
        <p className="m-auto mt-12 text-center text-2xl">No Jobs Found...</p>
      )}
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalCount / jobsPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: JobsFilterValues;
}

function Pagination({
  currentPage,
  totalPages,
  filterValues: { query, type, status, location, remote, hybrid, onSite },
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(query && { query }),
      ...(type && { type }),
      ...(status && { status }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      ...(hybrid && { hybrid: "true" }),
      ...(onSite && { onSite: "true" }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        Forrige
      </Link>
      <span>
        Side {currentPage} av {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible",
        )}
      >
        Neste
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
