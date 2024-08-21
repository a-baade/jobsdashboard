"use client";

export default function ErrorPage() {
  return (
    <main className="m-auto my-10 max-w-5xl space-y-5 px-3 text-center">
      <h1 className="text-md text-4xl font-extrabold tracking-tight text-custom-primary lg:text-5xl">
        Error
      </h1>
      <p className="text-muted-foreground">An unexpected error has occurred</p>
    </main>
  );
}
