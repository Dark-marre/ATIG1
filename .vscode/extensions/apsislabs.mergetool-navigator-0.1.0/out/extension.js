"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
let prevConflictItem;
let conflictCountItem;
let nextConflictItem;
let conflictLineNumbers = [];
const MERGE_REGEX = /^<<<<<<</;
function activate({ subscriptions }) {
    const nextMergeConflict = "gitmerge.nextMergeConflict";
    const prevMergeConflict = "gitmerge.prevMergeConflict";
    subscriptions.push(vscode.commands.registerCommand(nextMergeConflict, () => {
        updateConflictCount();
        vscode.commands.executeCommand("merge-conflict.next");
    }));
    subscriptions.push(vscode.commands.registerCommand(prevMergeConflict, () => {
        updateConflictCount();
        vscode.commands.executeCommand("merge-conflict.previous");
    }));
    // Create status bar items in order.
    const Left = vscode.StatusBarAlignment.Left;
    conflictCountItem = vscode.window.createStatusBarItem(Left);
    prevConflictItem = vscode.window.createStatusBarItem(Left);
    nextConflictItem = vscode.window.createStatusBarItem(Left);
    prevConflictItem.text = "$(chevron-left)";
    prevConflictItem.command = prevMergeConflict;
    nextConflictItem.text = "$(chevron-right)";
    nextConflictItem.command = nextMergeConflict;
    // Setup Listeners
    const window = vscode.window;
    const workspace = vscode.workspace;
    subscriptions.push(conflictCountItem);
    subscriptions.push(prevConflictItem);
    subscriptions.push(nextConflictItem);
    subscriptions.push(window.onDidChangeActiveTextEditor(updateConflictCount));
    subscriptions.push(workspace.onDidChangeTextDocument(updateConflictCount));
    subscriptions.push(workspace.onDidOpenTextDocument(updateConflictCount));
    subscriptions.push(workspace.onDidSaveTextDocument(updateConflictCount));
    subscriptions.push(workspace.onDidSaveTextDocument(warnIfConflicts));
    // Update once at start
    updateConflictCount();
}
exports.activate = activate;
const warnIfConflicts = () => {
    const { activeTextEditor } = vscode.window;
    if (activeTextEditor) {
        const count = getMergeConflictCount(activeTextEditor.document);
        if (count && count > 0) {
            vscode.window.showWarningMessage(`You have saved a file with ${count} unresolved conflicts! Be sure to resolve these prior to exiting.`);
        }
    }
};
const getMergeConflictLineNumbers = (document) => {
    conflictLineNumbers = [];
    if (document) {
        const numLines = document.lineCount;
        for (let index = 0; index < numLines; index++) {
            const line = document.lineAt(index);
            if (line.text.match(MERGE_REGEX)) {
                conflictLineNumbers.push(index);
            }
        }
    }
    // ensure sort
    conflictLineNumbers.sort();
    return conflictLineNumbers;
};
const getMergeConflictCount = (document) => {
    if (document) {
        return getMergeConflictLineNumbers(document).length;
    }
    return 0;
};
function updateConflictCount() {
    const { activeTextEditor } = vscode.window;
    if (activeTextEditor) {
        let n = getMergeConflictCount(activeTextEditor.document);
        if (n > 0) {
            conflictCountItem.text = `$(git-merge) ${n} Merge Conflicts`;
            conflictCountItem.show();
            prevConflictItem.show();
            nextConflictItem.show();
        }
        else {
            conflictCountItem.hide();
            prevConflictItem.hide();
            nextConflictItem.hide();
        }
    }
}
//# sourceMappingURL=extension.js.map