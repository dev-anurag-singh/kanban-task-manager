import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import { cn } from "@/lib/utils";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Kanban",
    default: "Kanban",
  },
  description:
    "Kanban style task manager to fit your all task management needs.",
  icons: "/icon.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={cn("h-full overflow-hidden", font.className)}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
