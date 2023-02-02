import { ActionIcon, Collapse, Group, Stack, Text } from "@mantine/core";
import { useToggle } from "react-use";
import { CollapseButton } from "./CollapseButton";
import { isObject } from "lodash";
import { Prism } from "@mantine/prism";
import fileDownload from "js-file-download";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
const bytes = require("bytes");

export const Response = ({ date, response }) => {
  const [collapsed, toggleCollapse] = useToggle(false);

  const displayRes = isObject(response)
    ? JSON.stringify(response, undefined, 2)
    : response;

  const responseBytes = displayRes.length;

  const isTooLarge = responseBytes > bytes("1mb");

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
      </Group>
      <Collapse in={!collapsed}>
        {isTooLarge ? (
          <Prism language="text">{tooLargeMessage}</Prism>
        ) : (
          <Prism language="json">
            {isObject(response)
              ? JSON.stringify(response, undefined, 2)
              : response}
          </Prism>
        )}
      </Collapse>
    </Stack>
  );
};
