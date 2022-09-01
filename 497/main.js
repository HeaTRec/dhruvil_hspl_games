"use strict";
// Disable Element Drag, Set MouseState Listeners 
// (allows drag to affect keyboard @ onmouseover)
document.documentElement.ondragstart = function () { return (false); };
var mouse_IsDown = false;
document.documentElement.addEventListener("mousedown", function () { mouse_IsDown = true; });
document.documentElement.addEventListener("mouseup", function () { mouse_IsDown = false; });
// Initialize Tone.js Synthesizer
StartAudioContext(Tone.context);
const synth = new Tone.PolySynth({ voice: Tone.Synth }).toMaster();
// Update Key Colors for Pressed/Released States
function update_KeyColor(key, keyState) {
    keyColor = key.matches(".white") ? "white" : "black";
    if (keyColor == "white" && keyState == "up") {
        key.style.backgroundColor = "#CBCBCB";
    }
    else if (keyColor == "white" && keyState == "down") {
        key.style.backgroundColor = "#BBBBDD";
    }
    else if (keyColor == "black" && keyState == "up") {
        key.style.backgroundColor = "#222222";
    }
    else if (keyColor == "black" && keyState == "down") {
        key.style.backgroundColor = "#666699";
    }
}
// Key Pressed/Released Callbacks
function play_Note(key) {
    synth.triggerAttack([key.dataset.note], undefined, 1);
    update_KeyColor(key, "down");
}
function release_Note(key) {
    synth.triggerRelease([key.dataset.note], undefined);
    update_KeyColor(key, "up");
}
// Hook Key Callbacks to Mouse/Touch Events
var keyboard = document.getElementById("keyboard");
for (let key of keyboard.children) {
    key.addEventListener("mouseover", function () { if (mouse_IsDown)
        play_Note(key); });
    key.addEventListener("mousedown", function () { play_Note(key); });
    key.addEventListener("touchstart", function () { play_Note(key); });
    key.addEventListener("mouseleave", function () { release_Note(key); });
    key.addEventListener("mouseup", function () { release_Note(key); });
    key.addEventListener("touchend", function () { release_Note(key); });
}
