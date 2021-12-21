"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bash = exports.initBashing = void 0;
const path = require("path");
const glob = require("glob");
const Player_1 = require("./Player");
const vscode_1 = require("vscode");
let bashes;
function initBashing(extensionPath) {
    let globPattern = vscode_1.workspace.getConfiguration("hotheadedVSCode").get("voiceLineGlob");
    if (globPattern == null || globPattern.length === 0) {
        globPattern = path.join(extensionPath, "assets/**/*.wav");
    }
    glob(globPattern, (error, matches) => {
        bashes = matches;
    });
}
exports.initBashing = initBashing;
const takenBashes = new Array();
function randomMessage() {
    let bash;
    do {
        bash = bashes[Math.floor(Math.random() * bashes.length)];
    } while (takenBashes.includes(bash));
    takenBashes.push(bash);
    if (takenBashes.length > Math.round(bashes.length * 0.4)) {
        takenBashes.shift();
    }
    return bash;
}
function randomFile() {
    return randomMessage();
}
function bash() {
    Player_1.addToPlayQueue(randomFile());
}
exports.bash = bash;
//# sourceMappingURL=Basher.js.map