"use client";
import { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal() {
  const ref = useRef<Element | null>(null);

  useLayoutEffect(() => {
    ref.current = document.body;
  }, []);

  console.log("ran");

  return ref?.current
    ? createPortal(
        <div className="fixed top-0 h-full w-full bg-black bg-opacity-50">
          <div className=" ml-14 mt-4 h-80 w-64 rounded-lg bg-white">
            Content
          </div>
        </div>,
        ref.current,
      )
    : null;
}

export default Modal;
