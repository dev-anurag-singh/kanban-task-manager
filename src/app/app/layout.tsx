async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen">
      <div className="grid grow">{children}</div>
    </div>
  );
}

export default AppLayout;
