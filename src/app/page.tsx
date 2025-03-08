import { LogoLarge } from "@/components/Logo";
import { Loader2 } from "lucide-react";

function Page() {
  return (
    <div className="grid h-full place-content-center">
      <div className="flex flex-col items-center gap-10">
        <div>
          <LogoLarge />
        </div>
        <div>
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </div>
    </div>
  );
}

export default Page;
