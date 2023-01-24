import {
  Button,
  Checkbox,
  Code,
  Divider,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";

export const GreetingModal = ({ greetingModal }) => {
  return (
    <Modal
      size={"lg"}
      opened={greetingModal.isOpen}
      onClose={greetingModal.close}
      centered
      overflow="inside"
      title={<Title size="h2">Welcome to DCS Fiddle 👋</Title>}
    >
      <Stack>
        <Text>This website is a text editor and console.</Text>

        <Text>
          Pressing the <b>Send</b> button will submit the command to DCS.
        </Text>

        <Text>
          Pressing the <b>Share</b> button will encode your script into a
          shareable link.
        </Text>

        <Title size="h3">About</Title>

        <Text>
          This site sends a <Code>GET</Code> request to the sim over http when
          the server is enabled.
        </Text>

        <Text>
          See the technical information inside the Docs for more info on the
          architecture.
        </Text>
        <Title size="h3">Installation</Title>

        <Text>
          The HTTP server is a downloadable lua script. You will need to create
          a mission to load and run it.
        </Text>

        <Text>Download Link:</Text>
        <Text variant="link">
          <a href="/httpd.lua" target="_blank">
            httpd.lua
          </a>
        </Text>

        <Text>
          See the Getting started guide inside the documentation for more
          information.
        </Text>

        <Title size="h3">Disclaimer</Title>

        <Text fs="italic">
          The Software and code samples available on this website are provided
          "as is" without warranty of any kind, either express or implied. Use
          at your own risk. By pressing proceed you understand these risks.
        </Text>

        <Divider />

        <Group style={{ justifyContent: "space-between" }}>
          <Checkbox
            label="Dont Show Again"
            checked={greetingModal.dontShowAgainChecked}
            onChange={({ target }) =>
              greetingModal.setDontShowAgainChecked(target.checked)
            }
          />
          <Button onClick={greetingModal.close}>Proceed</Button>
        </Group>
      </Stack>
    </Modal>
  );
};
