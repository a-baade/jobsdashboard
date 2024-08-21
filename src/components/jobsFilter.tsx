import { types, locationTypes } from "@/lib/job-types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import prisma from "@/lib/prisma";
import { jobsFilterSchema, JobsFilterValues } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "./jobsFilterFormSubmitButton";

// Async function to filter jobs based on form data
async function filterJobs(formData: FormData) {
  "use server";

  // Convert FormData to an object for easier manipulation
  const values = Object.fromEntries(formData.entries());

  // Parse the form values using the validation schema
  const { query, type, location, remote, hybrid, onSite } =
    jobsFilterSchema.parse(values);

  // Construct search parameters from the parsed form values
  const searchParams = new URLSearchParams({
    ...(query && { query: query.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
    ...(hybrid && { hybrid: "true" }),
    ...(onSite && { onSite: "true" }),
  });
  // Redirect to the filtered job listing page
  redirect(`/?${searchParams.toString()}`);
}

// Props interface for the JobsFilterSideBar component
interface JobsFilterProps {
  defaultValues: JobsFilterValues;
}

// Main component for rendering the job filter sidebar
export default async function JobsFilterSideBar({
  defaultValues,
}: JobsFilterProps) {
  // Fetch predefined job locations from the database
  const definedLocations = (await prisma.job
    .findMany({
      where: { approved: true }, // Only fetch approved jobs
      select: { location: true }, // Select only the location field
      distinct: ["location"], // Ensure unique locations
    })
    .then(
      (locations) => locations.map(({ location }) => location).filter(Boolean), // Map and filter locations
    )) as string[];

  // Render the job filter sidebar form
  return (
    <div className="sticky top-0 z-10 m-2 h-fit">
      <aside className="mt-10 border-2 border-custom-primary bg-background p-5 md:w-[300px]">
        <form action={filterJobs} key={JSON.stringify(defaultValues)}>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="query">Søk</Label>
              <Input
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
