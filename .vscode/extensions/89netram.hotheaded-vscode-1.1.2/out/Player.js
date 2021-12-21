"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToPlayQueue = void 0;
const Speaker = require("speaker");
const fs = require("fs");
const playQueue = new Array();
let isPlaying = false;
function play(file) {
    isPlaying = true;
    const speaker = new Speaker({
        channels: 2,
        bitDepth: 16,
        sampleRate: 44100,
        final: donePlaying
    });
    fs.createReadStream(file).pipe(speaker);
}
function donePlaying() {
    isPlaying = false;
    const nextFile = playQueue.shift();
    if (nextFile !== undefined) {
        play(nextFile);
    }
}
function addToPlayQueue(file) {
    if (!isPlaying) {
        play(file);
    }
    else {
        playQueue.push(file);
    }
}
exports.addToPlayQueue = addToPlayQueue;
//# sourceMappingURL=Player.js.map