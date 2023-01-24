import "./App.module.css";
import { Stack } from "@mantine/core";
import Editor from "@monaco-editor/react";
import { useRef } from "react";
import styles from "./App.module.css";
import { Response } from "./components/Response";
import { AppHeader } from "./components/AppHeader";
import { AppNavbar } from "./components/AppNavbar";
import { useDcsCommand } from "./hooks/useDcsCommand";
import { HelpModal } from "./components/HelpModal";
import { useHelp } from "./hooks/useHelp";

function App() {
  const editorRef = useRef(null);
  const { responses, submitting, submitCommand } = useDcsCommand();
  const help = useHelp();

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <div className={styles.shell}>
      <div className={styles.header}>
        <AppHeader
          submitting={submitting}
          onSubmit={() => submitCommand(editorRef.current.getValue())}
          onHelp={help.toggleHelpOpen}
        />
      </div>
      <div className={styles.navbar}>
        <AppNavbar />
      </div>
      <div className={styles.editor}>
        <Editor
          theme="vs-dark"
          defaultLanguage="lua"
          defaultValue="return env.mission.theatre"
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
      <HelpModal
        open={help.helpOpen}
        onClose={help.toggleHelpOpen}
        showHelpOnStart={help.showHelpOnStart}
        setShowHelpOnStart={help.setShowHelpOnStart}
      />
    </div>
  );
}

export default App;
