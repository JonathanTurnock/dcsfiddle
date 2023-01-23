import "./App.module.css";
import {
  ActionIcon,
  Button,
  Code,
  Group,
  Header,
  Image,
  Navbar,
  Title,
  Tooltip,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import styles from "./App.module.css";

function App() {
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();

  const sendIt = async () => {
    const command = editorRef.current.getValue();
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:12080/api/", {
        params: { command },
      });
      setResponse(data);
      showNotification({
        message: "Success",
        color: "green",
      });
    } catch (e) {
      showNotification({
        title: "Failed to execute",
        message: e.toString(),
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <div className={styles.shell}>
      <div className={styles.header}>
        <Header p={"xs"}>
          <Group>
            <Image height={48} width={48} src={"/logo256.png"} />
            <Title style={{ fontFamily: "IBM Plex Mono" }}>DCS Fiddle...</Title>
          </Group>
          <Group>
            <Button loading={loading} onClick={sendIt}>
              <Group>
                Send <FontAwesomeIcon icon={faPaperPlane} />
              </Group>
            </Button>
          </Group>
        </Header>
      </div>
      <div className={styles.navbar}>
        <Navbar styles={{ root: { height: "100%" } }}>
          <Navbar.Section grow>
            <Tooltip label="Home">
              <ActionIcon
                size={50}
                color="light"
                style={{
                  borderRadius: 0,
                }}
              >
                <FontAwesomeIcon icon={faHome} />
              </ActionIcon>
            </Tooltip>
          </Navbar.Section>
        </Navbar>
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
        <Code
          color="dark"
          shade={9}
          style={{
            flex: "1 1 auto",
            borderRadius: 0,
            backgroundColor: "#1E1E1E",
          }}
          p={"xs"}
        >
          {JSON.stringify(response, undefined, 2)}
        </Code>
      </div>
    </div>
  );
}

export default App;
