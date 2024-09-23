import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackButton() {
  return (
    <header className="shadow-sm">
      <nav className="m-auto flex items-start justify-between px-3 py-5">
        <Link href="/" passHref>
          <button className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <ArrowLeft size={16} />
              {"Tilbake"}
            </div>
          </button>
        </Link>
      </nav>
    </header>
  );
}
