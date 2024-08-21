import { Metadata } from "next";
import PostNewJobForm from "./postNewJobForm";

export const metadata: Metadata = {
  title: "Legg til ny applikasjon",
};
export default function Page() {
  return <PostNewJobForm />;
}
