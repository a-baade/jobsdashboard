"use client";
import { deleteJob } from "@/app/actions";
import { useFormState } from "react-dom";
import FormSubmitButton from "./jobsFilterFormSubmitButton";

interface JobListButtonProps {
  jobId: number;
}

export function DeleteJobButton({ jobId }: JobListButtonProps) {
  const [formState, formAction] = useFormState(deleteJob, undefined);

  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" defaultValue={jobId} />
      <FormSubmitButton>X</FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}
