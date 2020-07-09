/**
 * Script to help find keycodes for creating hotkeys
 * The keycodes of pressed keys will be logged to console
 */
const ioHook = require('iohook');

//Create on keydown hook
ioHook.on("keydown", (event) => {
    //Log keycode to console
    console.log(event.keycode);
});

//Start hook
ioHook.start();