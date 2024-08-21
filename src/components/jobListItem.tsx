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

export default function JobListItem({
  job: {
    id,
    slug,
    title,
    companyName,
    type,
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
    <div className="flex items-start justify-between">
      <Link key={job.id} href={`/jobs/${job.slug}`} className="block" passHref>
        <article
          key={id}
          className="group m-2 mt-12 flex gap-3 border-2 border-solid border-custom-primary p-5 hover:bg-custom-primary md:w-[520px]"
        >
          <Image
            src={companyLogoUrl || companyLogoPlaceholder}
            alt={`${companyName} logo`}
            width={100}
            height={100}
            className="self-center"
          />
          <div className="flex-grow space-y-3">
            <div>
              <h1 className="text-xl group-hover:text-black/80">{title}</h1>
              <p className="text-xs text-custom-secondary group-hover:text-black/60">
                {companyName}
              </p>
            </div>
            <div className="text-muted-foreground group-hover:text-muted/80">
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
              <p className="flex items-center gap-1.5">
                <Banknote size={16} className="shrink-0" />
                {formatCurrency(salary ?? 0)}
              </p>
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
            <Badge>{"Sendt/ Avist"}</Badge>
            <span className="flex items-center gap-1.5 text-muted-foreground group-hover:text-muted/80">
              <Clock size={16} />
              {relativeDate(createdAt)}
            </span>
          </div>
        </article>
      </Link>
      <div className="m-12 ml-auto mt-5 flex-col items-end text-xl group-hover:text-black/80">
        <DeleteJobButton jobId={job.id} />
      </div>
    </div>
  );
}
