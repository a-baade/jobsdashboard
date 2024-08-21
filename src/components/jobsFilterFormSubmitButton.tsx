"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import LoadingButton from "./loadingBtn";

export default function FormSubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { pending } = useFormStatus();
  const bgColorClass = pending ? "bg-custom-primary text-black/80" : "";
  return <LoadingButton {...props} type="submit" loading={pending} />;
}
