"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const ErrorTracker_1 = require("./ErrorTracker");
const Basher_1 = require("./Basher");
function activate(context) {
    Basher_1.initBashing(context.asAbsolutePath(""));
    vscode_1.languages.onDidChangeDiagnostics(ErrorTracker_1.OnDidChangeDiagnostics, null, context.subscriptions);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map