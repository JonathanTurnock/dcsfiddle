import {
  ActionIcon,
  CopyButton,
  Group,
  List,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { useExplorer } from "../hooks/useExplore";
import { entries, isArray, isBoolean, isNumber, isString } from "lodash";
import styles from "./explorer.module.css";
import { useMemo } from "react";
import { useLogger } from "react-use";
import {
  VscCheck,
  VscChevronDown,
  VscChevronRight,
  VscCopy,
  VscSymbolBoolean,
  VscSymbolMethod,
  VscSymbolMisc,
  VscSymbolNumeric,
  VscSymbolString,
} from "react-icons/vsc";
import { match } from "ts-pattern";
import { useClipboard } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";

const canExplore = (v) => v === "table" || v === "root";

export const ExploreNode = ({ k, v, scope, filter }) => {
  useLogger("ExploreNode");

  const myScope = useMemo(() => [...scope, k], [scope, k]);
  const address = useMemo(
    () =>
      myScope.length === 1
        ? myScope
        : `${myScope[0]}${myScope
            .slice(1)
            .map((it) => `[${JSON.stringify(it)}]`)
            .join("")}`,
    [myScope]
  );
  const { data, fetchData, fetching, clearData } = useExplorer(address);
  const { copy } = useClipboard();

  const explorable = useMemo(() => canExplore(v), [v]);

  let exploreIcon = useMemo(
    () =>
      !explorable ? (
        match(v)
          .when(isNumber, () => <VscSymbolNumeric />)
          .when(
            (v) => isString(v) && v.startsWith("function"),
            () => <VscSymbolMethod />
          )
          .when(isString, () => <VscSymbolString />)
          .when(isBoolean, () => <VscSymbolBoolean />)
          .otherwise(() => <VscSymbolMisc />)
      ) : data ? (
        <VscChevronDown />
      ) : (
        <VscChevronRight />
      ),
    [v, explorable, data]
  );

  return (
    <List.Item
      icon={
        <ActionIcon
          className={styles.exploreButton}
          disabled={!explorable}
          onClick={data ? clearData : fetchData}
          loading={fetching}
        >
          {exploreIcon}
        </ActionIcon>
      }
    >
      <Stack>
        <Group>
          <Text>{k}</Text>
          <Text fs="italic" color="dimmed">
            {v}
          </Text>
          <CopyButton value={JSON.stringify(data)} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied" : "Copy"}
                withArrow
                position="right"
              >
                <ActionIcon
                  color={copied ? "blue" : "gray"}
                  variant="subtle"
                  onClick={() => {
                    copy();
                    showNotification({
                      message: `Copied ${address} Data to Clipboard`,
                    });
                  }}
                >
                  {copied ? <VscCheck /> : <VscCopy />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Group>
        <List>
          {isArray(data)
            ? data.map((v, idx) => (
                <ExploreNode k={idx + 1} v={v} scope={myScope} />
              ))
            : entries(data)
                .filter(([k]) => !filter || k.includes(filter))
                .sort(([ak], [bk]) => ak.localeCompare(bk))
                .map(([k, v]) => <ExploreNode k={k} v={v} scope={myScope} />)}
        </List>
      </Stack>
    </List.Item>
  );
};
