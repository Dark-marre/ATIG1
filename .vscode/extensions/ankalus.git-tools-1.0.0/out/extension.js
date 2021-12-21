'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const child_process_1 = require("child_process");
const path_1 = require("path");
function activate(context) {
    let gitTools = new GitTools();
    // Commands
    let gitK = vscode_1.commands.registerCommand('extension.gitK', () => {
        gitTools.gitK();
    });
    let gitKCurrentFile = vscode_1.commands.registerCommand('extension.gitKCurrentFile', () => {
        gitTools.gitKCurrentFile();
    });
    let gitGui = vscode_1.commands.registerCommand('extension.gitGui', () => {
        gitTools.gitGui();
    });
    let gitGuiBlame = vscode_1.commands.registerCommand('extension.gitGuiBlame', () => {
        gitTools.gitGuiBlame();
    });
    let gitCurrentCheckout = vscode_1.commands.registerCommand('extension.gitCurrentCheckout', () => {
        gitTools.gitCurrentCheckout();
    });
    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(gitK);
    context.subscriptions.push(gitKCurrentFile);
    context.subscriptions.push(gitGui);
    context.subscriptions.push(gitGuiBlame);
    context.subscriptions.push(gitCurrentCheckout);
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
class GitTools {
    constructor() {
        this._gitkArgs = vscode_1.workspace.getConfiguration('gitTools').get('gitkArgs', ' --all');
    }
    /**
     * gitK
     *
     * open gitk for active project
     */
    gitK() {
        this.checkIsInsideGitWorkTree(() => {
            this.execShellCommand('gitk' + this._gitkArgs);
        });
    }
    /**
     * gitKCurrentFile
     *
     * open gitk for active file
     */
    gitKCurrentFile() {
        if (vscode_1.window.activeTextEditor) {
            this.checkIsInsideGitWorkTree(() => {
                this.execShellCommand('gitk' + this._gitkArgs + ' ' + this.file());
            });
        }
        else {
            this.gitK();
        }
    }
    /**
     * gitGui
     *
     * open Git Gui for project
     */
    gitGui() {
        this.checkIsInsideGitWorkTree(() => {
            this.execShellCommand('git gui');
        });
    }
    /**
     * gitGuiBlame
     *
     * open Git Gui blame of active file
     */
    gitGuiBlame() {
        if (vscode_1.window.activeTextEditor) {
            this.checkIsInsideGitWorkTree(() => {
                this.execShellCommand('git gui blame --line=' + this.line() + ' "' + this.file() + '"');
            });
        }
        else {
            vscode_1.window.showInformationMessage("Open file.");
        }
    }
    /**
     * gitCurrentCheckout
     *
     * checkout current file
     */
    gitCurrentCheckout() {
        if (vscode_1.window.activeTextEditor) {
            this.checkIsInsideGitWorkTree(() => {
                this.execShellCommand('git checkout "' + this.file() + '"');
            });
        }
        else {
            vscode_1.window.showInformationMessage("Open file.");
        }
    }
    /**
     * checkIsInsideGitWorkTree
     *
     * Checks is inside git repository work tree
     *
     * @param method function to run if check is positive
     */
    checkIsInsideGitWorkTree(method) {
        if (this.dir()) {
            child_process_1.exec(this.moveToProjectCommand() + 'git rev-parse --is-inside-work-tree', (err, stdout, stderr) => {
                if (err) {
                    vscode_1.window.showInformationMessage('Not a git repository!');
                }
                else {
                    method();
                }
            });
        }
        else {
            vscode_1.window.showWarningMessage('Not a git repository!');
        }
    }
    /**
     * moveToProjectCommand
     *
     * @returns prefix for execShellCommand
     */
    moveToProjectCommand() {
        const move_cmd = (process.platform == 'win32') ? 'pushd ' : 'cd ';
        return move_cmd + this.dir() + ' && ';
    }
    /**
     * execShellCommand
     *
     * @param command to run in shell
     */
    execShellCommand(command) {
        child_process_1.exec(this.moveToProjectCommand() + command, (err, stdout, stderr) => {
            if (err)
                console.log('error: ' + err);
        });
    }
    /**
     * file
     *
     * @returns active file or undefined
    */
    file() {
        if (vscode_1.window.activeTextEditor) {
            return vscode_1.window.activeTextEditor.document.uri.fsPath;
        }
        return undefined;
    }
    /**
     * dir
     *
     * @returns dir of active file or workspace root
     */
    dir() {
        const file = this.file();
        if (file) {
            return path_1.dirname(file);
        }
        else {
            return vscode_1.workspace.rootPath;
        }
    }
    /**
     * line
     *
     * @returns active line or undefined
    */
    line() {
        if (vscode_1.window.activeTextEditor) {
            return vscode_1.window.activeTextEditor.selection.active.line + 1;
        }
        return undefined;
    }
}
//# sourceMappingURL=extension.js.map