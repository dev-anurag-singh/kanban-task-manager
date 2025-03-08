import Sidebar from "@/components/Sidebar/Sidebar";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <Sidebar />
      {children}
    </div>
  );
}

export default AppLayout;
