import { Button, Group, Header, Image, Title } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faPaperPlane,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

export const AppHeader = ({
  submitting,
  onSubmit,
  onShare,
  onShowGreetingModal,
}) => (
  <Header height={66} p={"xs"} style={{ zIndex: 0 }}>
    <Group>
      <Image height={48} width={48} src={"/logo256.png"} />
      <Title style={{ fontFamily: "IBM Plex Mono" }}>DCS Fiddle...</Title>
    </Group>
    <Group>
      <Button onClick={onShowGreetingModal} variant="subtle">
        <FontAwesomeIcon icon={faInfo} />
      </Button>
      <Button onClick={onShare} variant="light">
        <Group>
          Share <FontAwesomeIcon icon={faShare} />
        </Group>
      </Button>
      <Button loading={submitting} onClick={onSubmit}>
        <Group>
          Send <FontAwesomeIcon icon={faPaperPlane} />
        </Group>
      </Button>
    </Group>
  </Header>
);
