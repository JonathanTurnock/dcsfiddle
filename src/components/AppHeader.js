import { Button, Group, Header, Image, Title } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export const AppHeader = ({ submitting, onSubmit, onHelp }) => (
  <Header height={66} p={"xs"}>
    <Group>
      <Image height={48} width={48} src={"/logo256.png"} />
      <Title style={{ fontFamily: "IBM Plex Mono" }}>DCS Fiddle...</Title>
    </Group>
    <Group>
      <Button onClick={onHelp} variant="subtle">
        <FontAwesomeIcon icon={faInfo} />
      </Button>
      <Button loading={submitting} onClick={onSubmit}>
        <Group>
          Send <FontAwesomeIcon icon={faPaperPlane} />
        </Group>
      </Button>
    </Group>
  </Header>
);
