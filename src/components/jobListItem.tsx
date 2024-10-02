import { Job } from "@prisma/client";
import companyLogoPlaceholder from "@/assets/company-logo-placeholder.png";
import Image from "next/image";
import { Banknote, Briefcase, Clock, Globe2, MapPin, X } from "lucide-react";
import { formatCurrency, relativeDate } from "@/lib/utils";
import Badge from "./ui/badge";
import { DeleteJobButton } from "./DeleteJobButton";
import Link from "next/link";

interface JobListItemProps {
  job: Job;
}

export default async function JobListItem({
  job: {
    id,
    slug,
    title,
    companyName,
    type,
    status,
    locationType,
    location,
    description,
    createdAt,
    companyLogoUrl,
    salary,
  },
  job,
}: JobListItemProps) {
  return (
    <div className="retro-container flex items-start justify-between">
      <Link key={job.id} href={`/jobs/${job.slug}`} className="block" passHref>
        <article
          key={id}
          className="hover:glow group m-2 mt-12 flex gap-3 border-2 border-solid border-custom-primary p-5 md:w-[520px]"
        >
          <Image
            src={companyLogoUrl || companyLogoPlaceholder}
            alt={`${companyName} logo`}
            width={100}
            height={100}
            className="self-center bg-white"
          />
          <div className="flex-grow space-y-3">
            <div>
              <h1 className="text-xl">{title}</h1>
              <p className="text-xs text-custom-secondary">{companyName}</p>
            </div>
            <div className="text-muted-foreground">
              <p className="flex items-center gap-1.5 sm:hidden">
                <Briefcase size={16} className="shrink-0" />
                {type}
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin size={16} className="shrink-0" />
                {locationType || "N/A"}
              </p>
              <p className="flex items-center gap-1.5">
                <Globe2 size={16} className="shrink-0" />
                {location || "N/A"}
              </p>
              {salary !== null && salary > 0 && (
                <p className="flex items-center gap-1.5">
                  <Banknote size={16} className="shrink-0" />
                  {formatCurrency(salary ?? 0)}
                </p>
              )}
              <p className="flex items-center gap-1.5">
                <Briefcase size={16} className="shrink-0" />
                {type}
              </p>
              <p className="flex items-center gap-1.5 sm:hidden">
                <Clock size={16} className="shrink-0" />
                {relativeDate(createdAt)}
              </p>
            </div>
          </div>

          <div className="mt-6 hidden shrink-0 flex-col items-start justify-between sm:flex">
            <Badge job={job}>{status}</Badge>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Clock size={16} />
              {relativeDate(createdAt)}
            </span>
          </div>
        </article>
      </Link>
      <div className="m-12 ml-auto mt-5 h-[20px] w-[20px] flex-col items-end text-xl group-hover:text-black/80">
        <DeleteJobButton jobId={job.id} />
      </div>
    </div>
  );
}
