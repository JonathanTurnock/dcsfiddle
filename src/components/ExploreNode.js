import { ActionIcon, Group, List, Stack, Text } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretDown,
  faSquareCaretRight,
  faSquare,
} from "@fortawesome/free-regular-svg-icons";
import { useExplorer } from "../hooks/useExplore";
import { entries } from "lodash";
import styles from "./explorer.module.css";

export const ExploreNode = ({ k, v, scope }) => {
  const myScope = [...scope, k];
  const { data, fetchData, fetching, clearData } = useExplorer(
    myScope.join(".")
  );

  const canExplore = ["table", "root"].includes(v);

  let exploreIcon = data ? faSquareCaretDown : faSquareCaretRight;

  if (!canExplore) {
    exploreIcon = faSquare;
  }

  return (
    <List.Item
      icon={
        <ActionIcon
          className={styles.exploreButton}
          disabled={!canExplore}
          onClick={data ? clearData : fetchData}
          loading={fetching}
        >
          <FontAwesomeIcon icon={exploreIcon} />
        </ActionIcon>
      }
    >
      <Stack>
        <Group>
          <Text>{k}</Text>
          <Text fs="italic" color="dimmed">
            {v}
          </Text>
        </Group>
        <List>
          {entries(data).map(([k, v], index) => (
            <ExploreNode k={k} v={v} scope={myScope} />
          ))}
        </List>
      </Stack>
    </List.Item>
  );
};
