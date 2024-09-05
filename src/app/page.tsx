"use client";
import { LogoLarge } from "@/components/Logo";
import { Board } from "@/lib/types";
import { fetchBoards } from "@/services/apiBoards";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const { data: boards, isLoading } = useQuery<Board[]>({
    queryKey: ["boards"],
    queryFn: fetchBoards,
  });

  const router = useRouter();

  useEffect(() => {
    if (!!boards) {
      router.push(`/board/${boards?.[0].id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards]);

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
