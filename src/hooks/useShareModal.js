import { useLocation } from "react-use";
import { useState } from "react";
import { BehaviorSubject } from "rxjs";

const link$ = new BehaviorSubject("");

/**
 * @param editor {monaco.editor.IStandaloneCodeEditor}
 */
export const useShareModal = (valueProvider) => {
  const url = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    const _url = new URL(url.origin);
    _url.searchParams.set("command", btoa(valueProvider()));

    link$.next(_url.href);
    setIsOpen(true);
  };

  return {
    link$,
    isOpen,
    open: handleOpen,
    close: () => setIsOpen(false),
  };
};
