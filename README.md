# Assistant Hot Key
Assistant Hot Key is a command-line Node.JS application used to bind Google Assistant commands to system-wide hotkeys. 

Useful for smart-home devices that don't have public APIs but do have Google Assistant support. 

Uses [nodejs-assistant](https://dabolus.github.io/nodejs-assistant/) for interfacing with Google Assistant and [ioHook](https://wilix-team.github.io/iohook/) for creating hotkeys.

Only tested on Windows, but should be compatible with MacOS and Linux.

## Usage
1. Follow the instruction [here](https://developers.google.com/assistant/sdk/guides/library/python/embed/config-dev-project-and-account) and [here](https://developers.google.com/assistant/sdk/guides/library/python/embed/register-device) for setting up the Google Assistant SDK
2. Once you download your OAuth credentials, save them as client_secret.json
3. Run authhelper.js to create a credentials.json file (this will prompt you to navigate to a URL and paste in the authorization code it gives you)
4. Configure hotkeys.json. More information under [configuration](#markdown-header-configuration)
5. Run the program using `node run` and leave it running in the background

## Configuration

Configuring your hotkeys is done by editing the example hotkeys.json file. 

There are two types of hotkeys: trigger and toggle.

Trigger hotkeys directly trigger one Google Assistant command, and are configured using the following format:

```JavaScript
"name": { //Name, doesn't matter but must be unique
    "type": "trigger",
    "keybind": [], //Array of keycodes
    "query": "" //Command for Google Assistant
}
```

Toggle hotkeys alternate between two Google Assistant command (ex. toggling a light), and are configured using the following format:

```JavaScript
"name": { //Name, doesn't matter but must be unique
    "type": "toggle",
    "keybind": [], //Array of keycodes
    "defaultstatus": "", //Starting status, either "on" or "off"
    "offquery": "", //Off command
    "onquery": "" //On command
}
```

Keycode for the "keybind" field can be found by running keycodehelper.js and pressing the desired keys.

## Todo
* Add a third "increment" mode for adjusting things like brightness or temperature
* Improve usability / documentation
* Potentially create a GUI
