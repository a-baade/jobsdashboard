import { auth, signIn } from "@/lib/auth";
import { Button } from "./ui/button";
import UserButton from "./UserButton";
import getSession from "@/lib/getSession";

export default async function NavBar() {
  const session = await getSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 bg-background px-2">
      <nav className="mx-auto flex max-w-7xl flex-grow justify-end">
        {!user && (
          <div className="flex h-12 w-24 flex-grow justify-end">
            <SignInButton />
          </div>
        )}
        {user && (
          <div className="flex-shrink-0">
            <UserButton user={user} />
          </div>
        )}
      </nav>
    </header>
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
