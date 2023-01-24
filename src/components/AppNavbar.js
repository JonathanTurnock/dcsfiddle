import { ActionIcon, Navbar, Tooltip } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export const AppNavbar = () => (
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
);
