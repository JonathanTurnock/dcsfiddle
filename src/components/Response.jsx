import { ActionIcon, Collapse, Group, Stack, Text } from "@mantine/core";
import { useToggle } from "react-use";
import { CollapseButton } from "./CollapseButton";
import { isObject } from "lodash";
import { Prism } from "@mantine/prism";
import fileDownload from "js-file-download";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
const bytes = require("bytes");

function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'key';
          } else {
              cls = 'string';
          }
      } else if (/true|false/.test(match)) {
          cls = 'boolean';
      } else if (/null/.test(match)) {
          cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
  });
}

const colorStyle = `<style>
body {
  background: #111;
  color: orange;
}
pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
.string { color: springgreen; }
.number { color: cyan; }
.boolean { color: blue; }
.null { color: magenta; }
.key { color: white; }</style>`;

export const Response = ({ date, response }) => {
  const [collapsed, toggleCollapse] = useToggle(false);

  const displayRes = isObject(response)
    ? JSON.stringify(response, undefined, 2)
    : response;

  const responseBytes = displayRes.length;

  const isTooLarge = responseBytes > bytes("100kb");

  const tooLargeMessage = `The response is ${bytes(
    responseBytes
  )}, download to view.`;

  return (
    <Stack spacing={2}>
      <Group p={4}>
        <CollapseButton collapsed={collapsed} onClick={toggleCollapse} />
        <Text size={"sm"}>{date}</Text>
        <ActionIcon onClick={() => fileDownload(displayRes, `${date}.json`)}>
          <FontAwesomeIcon icon={faDownload} />
        </ActionIcon>
        <ActionIcon onClick={() => {
          const pretty = JSON.stringify(response, undefined, 2)
          const colored = syntaxHighlight(pretty)
          const newWindow = window.open("json","_blank");
          newWindow.document.write('<html><body><pre>' + colored + '</pre></body></html>' )
          newWindow.document.write(colorStyle)
          newWindow.focus();
        }
        }>
          <FontAwesomeIcon icon={faWindowMaximize} />
        </ActionIcon>
      </Group>
      <Collapse in={!collapsed}>
        {isTooLarge ? (
          <Prism language="text">{tooLargeMessage}</Prism>
        ) : (
          <Prism language="json">
            {isObject(response)
              ? JSON.stringify(response, undefined, 2)
              : `${response}`}
          </Prism>
        )}
      </Collapse>
    </Stack>
  );
};
