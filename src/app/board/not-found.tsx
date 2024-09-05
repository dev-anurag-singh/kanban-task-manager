import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function NotFound() {
  return (
    <main className="grid basis-full place-items-center">
      <div className=" max-w-[21rem] space-y-6 text-center">
        <p className="text-lg text-muted-foreground">
          Could not find the requested board
        </p>
        <Link className={buttonVariants({ variant: "link" })} href="/">
          Return Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
