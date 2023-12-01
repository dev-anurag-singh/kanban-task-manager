"use client";
import { createContext, useState } from "react";

const ModalContext = createContext({});

function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState(false);

  const openModal = () => setModalState(true);
  const closeModal = () => setModalState(false);

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
