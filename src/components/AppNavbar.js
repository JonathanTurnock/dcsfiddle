import { ActionIcon, Navbar, Tooltip } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/fontawesome-free-brands";

export const AppNavbar = () => (
  <Navbar styles={{ root: { height: "100%" } }}>
    <Navbar.Section grow>
      <Tooltip label="Home">
        <ActionIcon size={50} color="light" style={{ borderRadius: 0 }}>
          <FontAwesomeIcon icon={faHome} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Support">
        <ActionIcon
          size={50}
          style={{ borderRadius: 0 }}
          onClick={() =>
            window.open("https://github.com/JonathanTurnock/dcsfiddle/issues")
          }
        >
          <FontAwesomeIcon icon={faQuestionCircle} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Github">
        <ActionIcon
          size={50}
          style={{ borderRadius: 0 }}
          onClick={() =>
            window.open("https://github.com/JonathanTurnock/dcsfiddle")
          }
        >
          <FontAwesomeIcon icon={faGithub} />
        </ActionIcon>
      </Tooltip>
    </Navbar.Section>
  </Navbar>
);
