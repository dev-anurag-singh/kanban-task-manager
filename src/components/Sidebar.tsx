"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";

// ICONS IMPORT
import BoardIcon from "@/icons/BoardIcon.svg";
import SunIcon from "@/icons/IconSun.svg";
import MoonIcon from "@/icons/IconMoon.svg";
import IconEye from "@/icons/IconEye.svg";
import IconEyeOpen from "@/icons/IconEyeOpen.svg";

function Sidebar({
  boards,
}: {
  boards: Array<{
    title: string;
    id: string;
  }>;
}) {
  const { theme, setTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  // SIDEBAR ANIMATION VARIANTS
  const variants = {
    open: { marginLeft: 0 },
    closed: { marginLeft: "calc(var(--sidebar-width)* -1)" },
  };

  return (
    <>
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.5 }}
        className="bg-muted text-muted-foreground absolute flex h-full w-full flex-col gap-5 overflow-hidden border-lines-light py-8 md:static md:basis-64 md:border-r lg:basis-80"
      >
        <h4 className="ml-6 text-sm uppercase lg:ml-8">All Boards (3)</h4>
        <div className="mb-auto">
          {boards.map(({ title, id }) => (
            <Link
              className={clsx(
                " mr-5 flex items-center gap-3 rounded-r-full px-6 py-4 text-md capitalize transition-colors lg:mr-6 lg:px-8",
                {
                  "bg-primary text-primary-foreground":
                    pathname === `/app/${id}`,
                  "hover:text-secondary-foreground hover:bg-secondary":
                    pathname !== `/app/${id}`,
                },
              )}
              key={id}
              href={`/app/${id}`}
            >
              <BoardIcon />
              {title}
            </Link>
          ))}
        </div>
        {/* Dark Mode Toggle */}
        <div className="bg-background mx-3 grid place-content-center rounded-md py-4 dark:bg-grey-darkest lg:mx-6">
          <div className="flex items-center gap-6">
            <SunIcon />
            <div
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={` bg-primary hover:bg-primary-hover flex h-5 w-10 cursor-pointer justify-start rounded-xl p-[3px] transition-colors dark:justify-end`}
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
        {/* Hide sidebar button */}
        <button
          onClick={() => setIsOpen(false)}
          className="hover:text-secondary-foreground hover:bg-secondary mr-5 flex items-center gap-4 rounded-r-full px-6 py-4 text-md transition-colors lg:mr-6 lg:px-8"
        >
          <IconEye />
          Hide Sidebar
        </button>
      </motion.div>
      {/* Open sidebar button */}
      {!isOpen && (
        <motion.button
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setIsOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary-hover absolute bottom-8 left-0 grid h-8 w-10 place-content-center rounded-r-full transition-colors md:h-12 md:w-14"
        >
          <IconEyeOpen />
        </motion.button>
      )}
    </>
  );
}

export default Sidebar;
