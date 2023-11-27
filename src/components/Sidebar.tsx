"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

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
  const variants = {
    open: { marginLeft: 0 },
    closed: { marginLeft: "calc(var(--sidebar-width)* -1)" },
  };

  const [isOpen, setIsOpen] = useState(true);

  const pathname = usePathname();

  return (
    <>
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.5 }}
        className="hidden basis-64 flex-col gap-5 overflow-hidden border-r border-lines-light bg-white py-8 transition-colors dark:border-lines-dark dark:bg-grey-dark md:flex lg:basis-80"
      >
        <h4 className="ml-6 text-sm uppercase text-grey-medium lg:ml-8">
          All Boards (3)
        </h4>
        <div className="mb-auto">
          {boards.map(({ title, id }) => (
            <Link
              className={clsx(
                " flex items-center gap-3 rounded-r-full px-6 py-4 text-md capitalize text-grey-medium transition-colors md:mr-5 lg:mr-6 lg:px-8",
                {
                  "bg-purple-dark text-white dark:bg-white dark:text-purple-dark":
                    pathname === `/app/${id}`,
                  "hover:bg-purple-100 hover:text-purple-dark":
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
        <div className="mx-3 grid place-content-center rounded-md bg-grey-light py-4 transition-colors dark:bg-grey-darkest lg:mx-6">
          <div className="flex items-center gap-6">
            <SunIcon />
            <div
              onClick={() => document.documentElement.classList.toggle("dark")}
              className={` flex h-5 w-10 cursor-pointer justify-start rounded-xl bg-purple-dark p-[3px] transition-colors hover:bg-purple-light dark:justify-end`}
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
          className="hover:bg-purple-100 mr-5 flex items-center gap-4 rounded-r-full px-6 py-4 text-md text-grey-medium transition-colors hover:text-purple-dark lg:mr-6 lg:px-8"
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
          className="absolute bottom-8 left-0 hidden h-12 w-14 place-content-center rounded-r-full bg-purple-dark text-white transition-colors hover:bg-purple-light md:grid"
        >
          <IconEyeOpen />
        </motion.button>
      )}
    </>
  );
}

export default Sidebar;
