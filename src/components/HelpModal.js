import {
  Checkbox,
  Group,
  Modal,
  Stack,
  Title,
  Text,
  Code,
  Image,
} from "@mantine/core";
import { Prism } from "@mantine/prism";

const exampleMissionScriptingLua = `\
-- Initialization script for the Mission lua Environment (SSE)
dofile('Scripts/ScriptingSystem.lua')

httpd = {}
httpd.bind_address = "localhost" -- set to "*" to allow connections from other computers (USE AT YOUR OWN RISK)
dofile(lfs.writedir()..[[Scripts\\dcs-httpd\\httpd.lua]])

-- Sanitize Mission Scripting environment
-- This makes unavailable some unsecure functions. 
-- Mission downloaded from server to client may contain potentialy harmful lua code that may use these functions.
-- You can remove the code below and make availble these functions at your own risk.

local function sanitizeModule(name)
    _G[name] = nil
    package.loaded[name] = nil
end

-- do
--     sanitizeModule('os')
--     sanitizeModule('io')
--     sanitizeModule('lfs')
--     _G['require'] = nil
--     _G['loadlib'] = nil
--     _G['package'] = nil
-- end
`;

const deleted = { color: "red", label: "-" };
const added = { color: "green", label: "+" };

export const HelpModal = ({
  open,
  onClose,
  showHelpOnStart,
  setShowHelpOnStart,
}) => {
  return (
    <Modal
      size={"75vw"}
      opened={open}
      onClose={onClose}
      centered
      overflow="inside"
    >
      <Stack spacing="md">
        <Stack>
          <Title size="h2">Welcome to DCS Fiddle 👋</Title>
          <Text>
            DCS Fiddle is a DCS Lua playground, it has an IDE and a console pane
            allowing you execute commands inside DCS over HTTP.
          </Text>
          <Text>
            It works by installing a script into DCS that starts a minimal HTTPD
            using pure LUA.
          </Text>
          <Text>
            The LUA commands inside the IDE are translated and run inside DCS
            and the response is returned.
          </Text>
        </Stack>
        <Stack>
          <Title size="h2">Getting Started</Title>
          <Stack>
            <Title size="h4">Installing the Script</Title>
            <Text>To get started, simply download the lua script file</Text>
            <Text variant="link">
              <a href="/httpd.lua" target="_blank">
                httpd.lua
              </a>
            </Text>
            <Text>Copy the script file to your Saved games folder, i.e.</Text>
            <Code>
              %userprofile%\Saved Games\DCS\Scripts\dcsfiddle\httpd.lua
            </Code>
          </Stack>
          <Stack>
            <Title size="h4">Enabling</Title>
            <Text>
              With the script installed head to the DCS installation directory,
              and into the scripts folder and open the mission scripting file.
            </Text>
            <Code>
              %programfiles%\Eagle Dynamics\DCS
              World\Scripts\MissionScripting.lua
            </Code>
            <Text>
              Add the below highlighted snippet to the file, just above the
              "Sanitize Mission Scripting Environment", and comment out the
              Sanitize Mission Scripting environment
            </Text>
            <Prism
              language="lua"
              withLineNumbers
              highlightLines={{
                4: added,
                5: added,
                6: added,
                18: deleted,
                19: deleted,
                20: deleted,
                21: deleted,
                22: deleted,
                23: deleted,
                24: deleted,
                25: deleted,
              }}
            >
              {exampleMissionScriptingLua}
            </Prism>
          </Stack>
          <Stack>
            <Title size="h4">Creating Mission</Title>
            <Text>
              The final step is to create a mission with the dcsfiddle httpd
              server running. Choose the theatre of your choice and add a
              trigger to fire once after one second, with an action of{" "}
            </Text>
            <Code>httpd.start(timer, env)</Code>
            <Image src="/mission-config.png" />

            <Text>
              If all has gone well you will get a little notice in the logs
              informing you
            </Text>

            <Code>%userprofile%\Saved Games\DCS\Logs\dcs.log</Code>
            <Code>
              2023-01-24 00:49:28.478 INFO SCRIPTING (Main): DCS Fiddle httpd
              server running on localhost:12080
            </Code>

            <Text>Happy Hacking!!!</Text>
          </Stack>
        </Stack>
        <Group>
          <Checkbox
            checked={showHelpOnStart}
            onChange={(event) => setShowHelpOnStart(event.target.checked)}
            label="Show on Start"
          />
        </Group>
      </Stack>
    </Modal>
  );
};
