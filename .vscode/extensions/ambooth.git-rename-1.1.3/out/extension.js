"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const logger_1 = require("./logger");
const spawnCMD = require("spawn-command");
const treeKill = require("tree-kill");
let process = null;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let channel = vscode.window.createOutputChannel("git-rename");
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "git-rename" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    // The code you place here will be executed every time your command is executed
    let disposable = vscode.commands.registerCommand("extension.git-rename", (file) => __awaiter(this, void 0, void 0, function* () {
        let folderPath = vscode.workspace.rootPath;
        const log = logger_1.default(channel);
        const dialogOptions = {
            value: file.fsPath
        };
        const newPath = yield vscode.window.showInputBox(dialogOptions);
        if (newPath == null || newPath === "") {
            return;
        }
        const command = `git mv "${file.fsPath}" "${newPath}"`;
        log(command);
        process = spawnCMD(command, { cwd: folderPath });
        process.stdout.on("data", (buffer) => log(buffer.toString()));
        process.stderr.on("data", (err) => {
            const str = err.toString();
            log(str);
            vscode.window.showErrorMessage(str);
        });
    }));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    if (process) {
        treeKill(process.pid, "SIGTERM", function (err) {
            if (err) {
                treeKill(process.pid, "SIGKILL");
            }
            process = null;
        });
    }
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map