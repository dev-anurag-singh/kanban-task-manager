"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
// ICONS IMPORT
import IconEye from "@/icons/IconEye.svg";
import IconEyeOpen from "@/icons/IconEyeOpen.svg";
import { LogoFull } from "../Logo";

import NavItems from "./NavItems";
import ThemeToggler from "./ThemeToggler";

function Sidebar({ boards }: { boards?: any[] | null }) {
  const [isOpen, setIsOpen] = useState(true);

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
        className="hidden shrink-0 basis-64 flex-col gap-5 overflow-hidden border-r bg-muted py-8 text-muted-foreground md:flex lg:basis-80"
      >
        <Link
          href="/"
          className="flex items-center p-6 pt-0 lg:w-80 lg:p-8 lg:pt-0"
        >
          <LogoFull />
        </Link>

        {/* Board List */}

        <NavItems boards={boards} />

        {/* Dark Mode Toggler */}

        <ThemeToggler />

        {/* Hide sidebar button */}

        <button
          onClick={() => setIsOpen(false)}
          className="relative z-10 mr-5 flex items-center gap-4 rounded-r-full px-6 py-4 text-lg transition-colors after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded-r-full after:bg-secondary after:transition-all after:duration-300 hover:text-secondary-foreground hover:after:w-full lg:mr-6 lg:px-8"
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
          className="absolute bottom-8 left-0 hidden h-12 w-14 place-content-center rounded-r-full bg-primary text-primary-foreground transition-colors hover:bg-primary/70 md:grid"
        >
          <IconEyeOpen />
        </motion.button>
      )}
    </>
  );
}

export default Sidebar;
