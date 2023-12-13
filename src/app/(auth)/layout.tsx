import { LogoFull } from "@/components/Logo";

async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col justify-center p-6 sm:items-center md:p-8 ">
      <div className="flex flex-col gap-10 sm:w-[30rem] md:gap-16">
        <div className="flex justify-center">
          <LogoFull />
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
