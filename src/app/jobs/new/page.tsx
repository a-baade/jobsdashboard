import { Metadata } from "next";
import PostNewJobForm from "./postNewJobForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";

export const metadata: Metadata = {
  title: "Legg til ny applikasjon",
};
export default async function Page() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/jobs/new");
  }
  return <PostNewJobForm />;
}
