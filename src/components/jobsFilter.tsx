import { types } from "@/lib/job-types";
import { FilterInput } from "./ui/filterInput";
import { Label } from "./ui/label";
import Select from "./ui/select";
import prisma from "@/lib/prisma";
import { jobsFilterSchema, JobsFilterValues } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "./jobsFilterFormSubmitButton";

async function filterJobs(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());

  console.log("Raw form values:", values);

  const { query, type, status, location, remote, hybrid, onSite } =
    jobsFilterSchema.parse(values);

  console.log("Parsed form values:", {
    query,
    type,
    status,
    location,
    remote,
    hybrid,
    onSite,
  });

  const searchParams = new URLSearchParams({
    ...(query && { query: query.trim() }),
    ...(type && { type }),
    ...(status && { status }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
    ...(hybrid && { hybrid: "true" }),
    ...(onSite && { onSite: "true" }),
  });
  redirect(`/?${searchParams.toString()}`);
}

interface JobsFilterProps {
  defaultValues: JobsFilterValues;
}

export default async function JobsFilterSideBar({
  defaultValues,
}: JobsFilterProps) {
  const definedLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <div className="sticky top-0 z-10 m-2 h-fit">
      <aside className="mt-10 border-2 border-custom-primary bg-background p-5 md:w-[300px]">
        <form action={filterJobs} key={JSON.stringify(defaultValues)}>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="query">Søk</Label>
              <FilterInput
                id="query"
                name="query"
                placeholder="Stilling, bedrift, ansettelses ..."
                defaultValue={defaultValues.query}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="type">Ansettelsesform</Label>
              <Select
                id="type"
                name="type"
                defaultValue={defaultValues.type || ""}
              >
                <option value="">Alle form</option>
                {types.map((type) => (
                  <option
                    className="... overflow-hidden truncate"
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="location">Sted</Label>
              <Select
                id="location"
                name="location"
                defaultValue={defaultValues.location || ""}
              >
                <option value="">Alle steder</option>
                {definedLocations.map((location) => (
                  <option
                    className="... overflow-hidden truncate"
                    key={location}
                    value={location}
                  >
                    {" "}
                    {location}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex flex-row items-start gap-2">
              {" "}
              <input
                id="remote"
                name="remote"
                type="checkbox"
                className="scale-125"
                defaultChecked={defaultValues.remote}
              />
              <Label htmlFor="remote">Remote</Label>
              <input
                id="hybrid"
                name="hybrid"
                type="checkbox"
                className="scale-125"
                defaultChecked={defaultValues.hybrid}
              />
              <Label htmlFor="hybrid">Hybrid</Label>
              <input
                id="onSite"
                name="onSite"
                type="checkbox"
                className="scale-125"
                defaultChecked={defaultValues.hybrid}
              />
              <Label htmlFor="onSite">On-Site</Label>
            </div>
            <FormSubmitButton type="submit" className="w-full">
              Filtrer jobber
            </FormSubmitButton>
          </div>
        </form>
      </aside>
    </div>
  );
}
