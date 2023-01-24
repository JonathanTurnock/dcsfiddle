## Getting Started

The combined process involves

- Downloading a `httpd.lua` into `%userprofile%\Saved Games\DCS\Scripts\httpd.lua` file.
- Removing the `sanitize` in the mission scripting environment for `require` and `package`.
- Creating a mission loading the `httpd.lua` and calling `httpd.start(timer, env)` after 1 second.

## Download

> By downloading this file you agree that its usage is at your own risk.
>
> Modification of this file is not permitted.
>
> It is configured as to not expose the system outside the localhost network.
>
> Modification may result in you unknowingly allowing someone to compromise your PC.

Download: [httpd.lua](http://localhost:3000/httpd.lua)

Copy the script file to your Saved games folder, i.e.

```shell
%userprofile%\Saved Games\DCS\Scripts\dcsfiddle\httpd.lua
```

## Enabling

With the script installed head to the DCS installation directory, and into the scripts folder and open the mission scripting file.

```shell
%programfiles%\Eagle Dynamics\DCS World\Scripts\MissionScripting.lua
```

Comment out the two lines as highlighted to make the `require` and `package` modules available

```lua
-- Initialization script for the Mission lua Environment (SSE)
dofile('Scripts/ScriptingSystem.lua')

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
[++]    -- _G['require'] = nil
    _G['loadlib'] = nil
[++]    -- _G['package'] = nil
end
```

> LUA uses two dashes as a line comment, put those at the start of the line

## Creating the Mission

The final step is to create a mission with the dcsfiddle httpd server running.

Choose the theatre of your choice and add the following triggers.

One to Load the script file

![mission-load-httpd](/mission-load-httpd.png)

And one to Start the server after 1 second

![mission-start-httpd](/mission-start-httpd.png)

The `Do Script` trigger should run the following script:

```lua
httpd.start(timer, env)
```

If all has gone well you will get a little notice in the logs informing you

```sell
%userprofile%\Saved Games\DCS\Logs\dcs.log
```

```text
2023-01-24 00:49:28.478 INFO SCRIPTING (Main): DCS Fiddle httpd server running on localhost:12080
```

You can also hit the health endpoint and confirm its working

[http://localhost:12080/health](http://localhost:12080/health)

Which should return the following

```json
{
  "status": "UP",
  "version": "2023-01-24T22:14:45+00:00"
}
```
