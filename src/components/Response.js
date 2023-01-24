import { Collapse, Group, Stack, Text } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { useToggle } from "react-use";
import { CollapseButton } from "./CollapseButton";

export const Response = ({ date, response }) => {
  const [collapsed, toggleCollapse] = useToggle(false);

  return (
    <Stack spacing={2}>
      <Group p={4}>
        <CollapseButton collapsed={collapsed} onClick={toggleCollapse} />
        <Text size={"sm"}>{date}</Text>
      </Group>
      <Collapse in={!collapsed}>
        <Prism style={{ width: "100%" }} withLineNumbers language="json">
          {JSON.stringify(response, undefined, 2)}
        </Prism>
      </Collapse>
    </Stack>
  );
};
