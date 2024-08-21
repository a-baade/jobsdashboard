"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createJobsSchema, CreateJobsValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { types, locationTypes } from "@/lib/job-types";
import TextEditor from "@/components/textEditor";
import { draftToMarkdown } from "markdown-draft-js";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/loadingBtn";
import { createJobPost } from "./actions";
import Navbar from "@/components/Navbar";

export default function PostNewJobForm() {
  const form = useForm<CreateJobsValues>({
    resolver: zodResolver(createJobsSchema),
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

  async function onSubmit(values: CreateJobsValues) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await createJobPost(formData);
    } catch (error) {
      alert("Something went wrong!!!");
    }
  }

  return (
    <main className="retro-container m-auto my-10 max-w-5xl space-y-10 bg-primary-dark">
      <Navbar />

      <div className="space-y-5 text-center">
        <h1 className="text-md text-4xl font-extrabold tracking-tight text-custom-primary lg:text-5xl">
          Legg til ny applikasjon
        </h1>
      </div>
      <div className="space-y-6 border-2 border-solid border-custom-primary p-5">
        <div>
          <h2 className="font-semibold">Jobb detaljer</h2>
          <p className="text-muted-foreground">
            Gi en stillingsbeskrivelse og detaljer
          </p>
        </div>
        <Form {...form}>
          <form
            className="space-y-4"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stillingstittel</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Omfang</FormLabel>
                  <FormControl>
                    <Select defaultValue={""} {...field}>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bedrift</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="companyLogo"
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <Input
                      className="retro-container file:h-fit file:w-fit file:bg-custom-primary file:font-extrabold"
                      type="file"
                      accept="image/*"
                      {...fieldValues}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="locationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remote || Hybrid || On-site</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={""}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        if (e.currentTarget.value === "Hjemmekontor") {
                          trigger("location");
                        }
                      }}
                    >
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="applicationUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Søknadslenke</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://"
                      id="applicationUrl"
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lønn</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label onClick={() => setFocus("description")}>
                    Beskrivelse
                  </Label>
                  <FormControl>
                    <TextEditor
                      onChange={(draft) =>
                        field.onChange(draftToMarkdown(draft))
                      }
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={isSubmitting}>
              Submit
            </LoadingButton>
          </form>
        </Form>
      </div>
    </main>
  );
}
