## Getting Started

The combined process involves
- Downloading a `httpd.lua` into `%userprofile%\Saved Games\DCS\Scripts\dcsfiddle\httpd.lua` file to listen for instructions.
- Enabling the `httpd.lua`in `%programfiles%\Eagle Dynamics\DCS World\Scripts\MissionScripting.lua`
- Removing the `sanitize` in the mission scripting environment so that you can use all the tools in lua.
- Creating a mission and calling `httpd.start(timer, env)` after 1 second.

### Disclaimer

> By downloading this file you agree that its usage is at your own risk. Modification of this file is not permitted.
> It is written as to not expose any system to malicious actors.
>
> This LUA script allows arbitrary LUA code to be invoked within DCS via a http endpoint.
> As is this will only be permitted from your local machine, this site, is specifically designed to only communicate
> over local host.

## Download

[httpd.lua](http://localhost:3000/httpd.lua)

Copy the script file to your Saved games folder, i.e.
```shell
%userprofile%\Saved Games\DCS\Scripts\dcsfiddle\httpd.lua
```

## Enabling

With the script installed head to the DCS installation directory, and into the scripts folder and open the mission scripting file.

```shell
%programfiles%\Eagle Dynamics\DCS World\Scripts\MissionScripting.lua
```

Add the highlighted snippet to the file, just above the "Sanitize Mission Scripting Environment"

```lua
-- Initialization script for the Mission lua Environment (SSE)
dofile('Scripts/ScriptingSystem.lua')

[++] httpd = {}
[++] httpd.bind_address = "localhost" -- set to "*" to allow connections from other computers (USE AT YOUR OWN RISK)
[++] dofile(lfs.writedir()..[[Scripts\dcs-httpd\httpd.lua]])

-- Sanitize Mission Scripting environment
-- This makes unavailable some unsecure functions.
-- Mission downloaded from server to client may contain potentialy harmful lua code that may use these functions.
-- You can remove the code below and make availble these functions at your own risk.

local function sanitizeModule(name)
    _G[name] = nil
    package.loaded[name] = nil
end

do
    sanitizeModule('os')
    sanitizeModule('io')
    sanitizeModule('lfs')
    _G['require'] = nil
    _G['loadlib'] = nil
    _G['package'] = nil
end
```

## Creating Mission

The final step is to create a mission with the dcsfiddle httpd server running. Choose the theatre of your choice and add a trigger to fire once after one second, with an action of

```lua
httpd.start(timer, env)
```
![mission-trigger](/mission-config.png)

If all has gone well you will get a little notice in the logs informing you

```sell
%userprofile%\Saved Games\DCS\Logs\dcs.log
```

```text
2023-01-24 00:49:28.478 INFO SCRIPTING (Main): DCS Fiddle httpd server running on localhost:12080
```