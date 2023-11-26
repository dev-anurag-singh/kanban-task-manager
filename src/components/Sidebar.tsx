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
    open: { opacity: 1, "margin-left": 0 },
    closed: { opacity: 0, "margin-left": "calc(var(--sidebar-width)* -1)" },
  };

  const [isOpen, setIsOpen] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.5 }}
        className="hidden basis-64 flex-col gap-5 overflow-hidden border-r border-lines-light bg-white py-8 md:flex lg:basis-80"
      >
        <h4 className="ml-6 text-sm uppercase text-grey-medium lg:ml-8">
          All Boards (3)
        </h4>
        <div className="mb-auto">
          {boards.map(({ title, id }) => (
            <Link
              className={clsx(
                "flex items-center gap-3 rounded-r-full px-6 py-4 text-md capitalize text-grey-medium hover:text-purple-dark  md:mr-5 lg:mr-6 lg:px-8",
                {
                  "bg-purple-dark text-white hover:text-white":
                    pathname === `/app/${id}`,
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
        <div className="mx-3 grid place-content-center rounded-md bg-grey-light py-4 lg:mx-6">
          <div className="flex items-center gap-6">
            <SunIcon />
            <div
              onClick={() => setIsDark((state) => !state)}
              className={clsx(
                ` flex h-5 w-10 cursor-pointer justify-start rounded-xl bg-purple-dark p-[3px] `,
                {
                  "justify-end": isDark,
                },
              )}
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
        <button
          onClick={() => setIsOpen(false)}
          className="mr-5 flex items-center gap-4 rounded-r-full px-6 py-4 text-md text-grey-medium transition-colors hover:bg-purple-dark hover:bg-opacity-10 hover:text-purple-dark lg:mr-6 lg:px-8"
        >
          <IconEye />
          Hide Sidebar
        </button>
      </motion.div>
      {!isOpen && (
        <motion.button
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setIsOpen(true)}
          className="absolute bottom-8 left-0 grid h-12 w-14 place-content-center rounded-r-full bg-purple-dark text-white transition-colors hover:bg-purple-light"
        >
          <IconEyeOpen />
        </motion.button>
      )}
    </>
  );
}

export default Sidebar;
