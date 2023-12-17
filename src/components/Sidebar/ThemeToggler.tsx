"use client";
import { motion } from "framer-motion";
import SunIcon from "@/icons/IconSun.svg";
import MoonIcon from "@/icons/IconMoon.svg";
import { useTheme } from "next-themes";

function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="dark:bg-grey-darkest mx-3 grid place-content-center rounded-md bg-background py-4 lg:mx-6">
      <div className="flex items-center gap-6">
        <SunIcon />
        <div
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={` hover:bg-primary-hover flex h-5 w-10 cursor-pointer justify-start rounded-xl bg-primary p-[3px] transition-colors dark:justify-end`}
        >
          <motion.div
            layout
            transition={{
              type: "spring",
              stiffness: 700,
              damping: 30,
            }}
            className="h-[14px] w-[14px] rounded-full bg-white"
          />
        </div>
        <MoonIcon />
      </div>
    </div>
  );
}

export default ThemeToggler;
