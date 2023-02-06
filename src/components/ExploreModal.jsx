import { List, Modal, Stack, Text, Title } from "@mantine/core";
import { ExploreNode } from "./ExploreNode";

export const ExploreModal = ({ onClose, open }) => {
  return (
    <Modal
      title={<Title variant="h2">Explorer</Title>}
      onClose={onClose}
      opened={open}
      overflow="inside"
      size="50vw"
    >
      <Stack>
        <Text>
          From here you can explore the DCS scripting environment, functions
          need to be called via a script.
        </Text>
        <List>
          <ExploreNode k={"_G"} v={"root"} scope={[]} />
        </List>
      </Stack>
    </Modal>
  );
};
