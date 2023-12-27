import { Metadata } from "next";
import Sidebar from "@/components/Sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Boards",
};

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen">
      <Sidebar />
      <div className="grid grow">{children}</div>
    </div>
  );
}

export default AppLayout;
