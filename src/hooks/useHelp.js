import { useLocalStorage, useToggle } from "react-use";

export const useHelp = () => {
  const [showHelpOnStart, setShowHelpOnStart] = useLocalStorage(
    "SHOW_HELP_ON_START",
    true
  );
  const [helpOpen, toggleHelpOpen] = useToggle(showHelpOnStart);

  return {
    helpOpen,
    toggleHelpOpen,
    showHelpOnStart,
    setShowHelpOnStart,
  };
};
