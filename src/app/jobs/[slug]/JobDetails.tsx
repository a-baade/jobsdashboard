"use client";
import { Job } from "@prisma/client";
import { Briefcase, Globe2, MapPin, Pencil } from "lucide-react";
import { types, locationTypes } from "@/lib/job-types";
import Image from "next/image";
import Link from "next/link";
import Markdown from "../../../components/Markdown";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Select from "../../../components/ui/select";
import TextEditor from "../../../components/textEditor";
import { draftToMarkdown } from "markdown-draft-js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../../../components/loadingBtn";
import { updateJobsSchema, UpdateJobsValues } from "@/lib/validation";
import { updateJobPost } from "@/app/jobs/[slug]/actions";
import Navbar from "../../../components/Navbar";

interface JobDetailsProps {
  job: Job;
  jobId: Job;
}

export default function JobDetails({
  job: {
    id,
    title,
    description,
    companyName,
    companyLogoUrl,
    applicationEmail,
    applicationUrl,
    type,
    location,
    locationType,
  },
  job,
  jobId,
}: JobDetailsProps) {
  const form = useForm<UpdateJobsValues>({
    resolver: zodResolver(updateJobsSchema),
  });

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: UpdateJobsValues) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
        console.log("Key and value pair: ", key, value);
      }
    });

    formData.append("jobId", id.toString());

    try {
      const result = await updateJobPost(formData);
      console.log("Update result:", result);
      if (result?.error) {
        alert(result.error);
      } else {
        setEditable("view");
        setIsLinkActive(true);
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      alert("Error: try again");
    }
  }

  const [isLinkActive, setIsLinkActive] = useState(true);
  const [mode, setEditable] = useState("view");

  const toggleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditable((prevMode) => (prevMode === "view" ? "edit" : "view"));
    setIsLinkActive(!isLinkActive);
  };

  return (
    <section className="retro-container m-auto bg-primary-dark">
      <Navbar />

      <div className="mb-4 flex items-center"></div>
      <Form {...form}>
        <form
          className="space-y-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div key={job.id} className="m-6 flex items-center gap-3">
            <FormField
              control={control}
              name="jobId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input hidden {...field} value={job.id} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div>
              {companyLogoUrl && (
                <Image
                  src={companyLogoUrl}
                  alt={companyLogoUrl}
                  width={100}
                  height={100}
                  className=""
                />
              )}
            </div>
            <div>
              {mode === "edit" && (
                <div className="m-12 ml-auto mt-5 flex-col items-end text-xl group-hover:text-black/80">
                  <LoadingButton type="submit" loading={isSubmitting}>
                    Save Changes
                  </LoadingButton>
                </div>
              )}{" "}
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md text-4xl font-extrabold tracking-tight text-custom-primary lg:text-5xl">
                      {mode === "view" ? (
                        title
                      ) : (
                        <FormControl>
                          <input {...field} defaultValue={title} />
                        </FormControl>
                      )}
                      <button onClick={(e) => toggleEdit(e)} className="">
                        <Pencil className="m-4" />
                      </button>
                      <FormMessage />
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <div className="my-2 flex items-center gap-1.5">
                      {!isLinkActive && companyName ? (
                        <FormControl>
                          <input {...field} defaultValue={companyName} />
                        </FormControl>
                      ) : (
                        <Link
                          href={`${new URL(applicationUrl || "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:underline"
                        >
                          <div className="inline-flex items-center text-green-500 hover:underline">
                            {mode === "view" ? (
                              companyName
                            ) : (
                              <FormControl>
                                <input {...field} defaultValue={companyName} />
                              </FormControl>
                            )}
                          </div>
                          <FormMessage />
                        </Link>
                      )}
                    </div>
                  </FormItem>
                )}
              />
              <div className="text-muted-foreground">
                <div className="my-2 flex items-center gap-1.5">
                  <Briefcase size={16} className="shrink-0" />
                  <FormField
                    control={control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        {mode === "view" ? (
                          type
                        ) : (
                          <FormControl>
                            <Select defaultValue={type} {...field}>
                              <option value="" hidden>
                                Select...
                              </option>
                              {types.map((jobType) => (
                                <option key={jobType} value={jobType}>
                                  {jobType}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2 flex items-center gap-1.5">
                  <MapPin size={16} className="shrink-0" />
                  <FormField
                    control={control}
                    name="locationType"
                    render={({ field }) => (
                      <FormItem>
                        {mode === "view" ? (
                          locationType
                        ) : (
                          <FormControl>
                            <Select defaultValue={locationType} {...field}>
                              <option value="" hidden>
                                Select...
                              </option>
                              {locationTypes.map((locationType) => (
                                <option key={locationType} value={locationType}>
                                  {locationType}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <div className="my-2 flex items-center gap-1.5">
                        {!isLinkActive && location ? (
                          <FormControl>
                            <input {...field} defaultValue={location || ""} />
                          </FormControl>
                        ) : (
                          <Link
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location || "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-500 hover:underline"
                          >
                            <div className="inline-flex items-center text-green-500 hover:underline">
                              <Globe2 size={16} className="mr-1 shrink-0" />
                              {mode === "view" ? (
                                location
                              ) : (
                                <FormControl>
                                  <input
                                    {...field}
                                    defaultValue={location || ""}
                                  />
                                </FormControl>
                              )}
                            </div>
                            <FormMessage />
                          </Link>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="text-custom-secondary">
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  {mode === "view" ? (
                    description && <Markdown>{description}</Markdown>
                  ) : (
                    <FormControl>
                      <TextEditor
                        initialContent={description || ""}
                        onChange={(draft) =>
                          field.onChange(draftToMarkdown(draft))
                        }
                        ref={field.ref}
                      />
                    </FormControl>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </section>
  );
}
