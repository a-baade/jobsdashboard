import { Job } from "@prisma/client";
import { statusTypes } from "@/lib/job-types";

interface BadgeProps {
  children: React.ReactNode;
  job: Job;
}

export default function Badge({ children, job: { status } }: BadgeProps) {
  let badgeClass =
    "border-2 border-muted bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground";

  // Conditionally add classes based on the status
  if (status === statusTypes[0]) {
    // Assuming Sendt corresponds to "Sendt"
    badgeClass += " text-lime-500";
  } else if (status === statusTypes[1]) {
    // Assuming Avist corresponds to "Avist"
    badgeClass += " text-rose-600";
  }
  return <span className={badgeClass}> {children}</span>;
}
