import Link from "next/link";
import "../../index.css";
import { Aperture } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Link
        href="/app"
        className="flex items-center gap-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-3 transition-all"
      >
        <Aperture className="h-5 w-5" /> Launch GetColor
      </Link>
    </div>
  );
}
