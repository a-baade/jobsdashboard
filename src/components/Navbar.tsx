import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <header className="shadow-sm">
      <nav className="m-auto flex items-start justify-between px-3 py-5">
        <button onClick={handleBack} className="flex items-start gap-3">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <ArrowLeft size={16} />
            {"Tilbake"}
          </div>
        </button>
      </nav>
    </header>
  );
}
