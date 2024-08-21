import { Job } from "@prisma/client";
import { statusTypes } from "@/lib/job-types";
import { Ban, CircleCheckBig } from "lucide-react";

interface BadgeProps {
  children: React.ReactNode;
  job: Job;
}

export default function Badge({ children, job: { status } }: BadgeProps) {
  let badgeClass =
    "flex items-center border-2 border-muted bg-muted px-2 py-0.5 text-sm font-medium";

  if (status === statusTypes[0]) {
    badgeClass += " text-lime-400";
  } else if (status === statusTypes[1]) {
    badgeClass += " text-rose-600";
  }

  const checkIcon =
    status === statusTypes[0] ? <CircleCheckBig size={16} /> : null;
  const banIcon = status === statusTypes[1] ? <Ban size={16} /> : null;
  return (
    <span className={badgeClass}>
      {" "}
      {checkIcon && <span className="mr-2">{checkIcon}</span>}
      {banIcon && <span className="ml-auto mr-2">{banIcon}</span>}
      {children}
    </span>
  );
}
