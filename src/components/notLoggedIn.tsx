import { auth, signIn } from "@/lib/auth";
import { Button } from "./ui/button";

export default function NotLoggedIn() {
  return (
    <main className="retro-container m-auto mt-28 max-w-5xl space-y-5 px-3 text-center">
      <h1 className="text-md text-4xl font-extrabold tracking-tight text-custom-primary lg:text-5xl">
        Mine Applikasjoner
      </h1>
      <p className="text-lg font-semibold text-muted-foreground">
        Holde oversikt over søknadene dine.
      </p>
      <SignInButton />
    </main>
  );
}

function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button
        className="retro-container h-10 w-40 border-2 border-custom-primary text-lg font-semibold"
        type="submit"
      >
        SIGN IN
      </Button>
    </form>
  );
}
