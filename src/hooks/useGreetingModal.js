import { useLocalStorage } from "react-use";
import { useState } from "react";

export const useGreetingModal = () => {
  const [dontShowAgainChecked, setDontShowAgainChecked] = useLocalStorage(
    "HIDE_GREETING_ON_START",
    true
  );
  const [isOpen, setIsOpen] = useState(dontShowAgainChecked ? false : true);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    dontShowAgainChecked,
    setDontShowAgainChecked,
  };
};
