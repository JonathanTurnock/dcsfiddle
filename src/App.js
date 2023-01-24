import "./App.module.css";
import { Stack } from "@mantine/core";
import Editor from "@monaco-editor/react";
import { useMemo, useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styles from "./App.module.css";
import { Response } from "./components/Response";
import { AppHeader } from "./components/AppHeader";
import { AppNavbar } from "./components/AppNavbar";
import { useDcsCommand } from "./hooks/useDcsCommand";
import { GreetingModal } from "./components/GreetingModal";
import { docs } from "./docs";
import { useGreetingModal } from "./hooks/useGreetingModal";
import { useShareModal } from "./hooks/useShareModal";
import { ShareModal } from "./components/ShareModal";
import { useSearchParam } from "react-use";

function App() {
  const command = useSearchParam("command");
  const editorRef = useRef(null);
  const { responses, submitting, submitCommand } = useDcsCommand();
  const greetingModal = useGreetingModal();
  const shareDialog = useShareModal(() => editorRef.current.getValue());

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: (
            <>
              <div className={styles.editor}>
                <Editor
                  theme="vs-dark"
                  defaultLanguage="lua"
                  defaultValue={
                    (command && atob(command)) || "return env.mission.theatre"
                  }
                  onMount={handleEditorDidMount}
                  options={{
                    fontFamily: "IBM Plex Mono",
                    fontSize: 14,
                  }}
                />
              </div>
              <div className={styles.terminal}>
                <Stack
                  p={"xs"}
                  spacing={4}
                  style={{ display: "flex", flex: "1 1 auto" }}
                >
                  {responses.map(([date, response]) => (
                    <Response key={date} response={response} date={date} />
                  ))}
                </Stack>
              </div>
            </>
          ),
        },
        ...docs,
      ]),
    [responses]
  );

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <div className={styles.shell}>
      <GreetingModal greetingModal={greetingModal} />
      <ShareModal
        link$={shareDialog.link$}
        open={shareDialog.isOpen}
        onClose={shareDialog.close}
      />
      <div className={styles.header}>
        <AppHeader
          submitting={submitting}
          onSubmit={() => submitCommand(editorRef.current.getValue())}
          onShowGreetingModal={greetingModal.open}
          onShare={shareDialog.open}
        />
      </div>
      <div className={styles.navbar}>
        <AppNavbar router={router} />
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
