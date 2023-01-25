import { Button, Group, Header, Image, Title, Tooltip } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faInfo,
  faPaperPlane,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import ms from "ms";

export const AppHeader = ({
  submitting,
  onSubmit,
  onShare,
  onShowGreetingModal,
  onExplore,
}) => (
  <Header height={66} p={"xs"} style={{ zIndex: 0 }}>
    <Group>
      <Image height={48} width={48} src={"/logo256.png"} />
      <Title style={{ fontFamily: "IBM Plex Mono" }}>DCS Fiddle...</Title>
    </Group>
    <Group>
      <Tooltip label="Explorer" openDelay={ms("1s")}>
        <Button onClick={onExplore} variant="subtle">
          <FontAwesomeIcon icon={faCompass} />
        </Button>
      </Tooltip>
      <Tooltip label="Information" openDelay={ms("1s")}>
        <Button onClick={onShowGreetingModal} variant="subtle">
          <FontAwesomeIcon icon={faInfo} />
        </Button>
      </Tooltip>
      <Tooltip label="Create a shareable link" openDelay={ms("1s")}>
        <Button onClick={onShare} variant="light">
          <Group>
            Share <FontAwesomeIcon icon={faShare} />
          </Group>
        </Button>
      </Tooltip>
      <Tooltip
        label="Send the editor content to DCS and execute it"
        openDelay={ms("1s")}
      >
        <Button loading={submitting} onClick={onSubmit}>
          <Group>
            Send <FontAwesomeIcon icon={faPaperPlane} />
          </Group>
        </Button>
      </Tooltip>
    </Group>
  </Header>
);
