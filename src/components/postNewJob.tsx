import Link from "next/link";
import { Button } from "./ui/button";

export default function PostNewJobSideBar() {
  return (
    <div className="sticky top-0 z-10 m-2 h-fit">
      <Button
        asChild
        className="mt-10 translate-x-1 border-2 border-custom-primary bg-background p-5 md:w-[143px]"
      >
        <Link href="/jobs/new">Legg til ny applikasjon</Link>
      </Button>
    </div>
  );
}
