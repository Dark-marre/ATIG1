"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnDidChangeDiagnostics = void 0;
const vscode_1 = require("vscode");
const Basher_1 = require("./Basher");
function OnDidChangeDiagnostics(e) {
    const activeTextEditor = vscode_1.window.activeTextEditor;
    if (activeTextEditor && e.uris.find(uri => uri.path === activeTextEditor.document.uri.path)) {
        const errors = errorsForFile(activeTextEditor, activeTextEditor.document.uri);
        if (errors.length > 0) {
            if (errors.filter((d) => !sameAsPrevious(d)).length > 0) {
                console.log(errors);
                Basher_1.bash();
                setPreviousError(errors[0]);
            }
        }
        else {
            console.log("No errors");
            clearPreviousError();
        }
    }
}
exports.OnDidChangeDiagnostics = OnDidChangeDiagnostics;
function errorsForFile(editor, fileUri) {
    return vscode_1.languages
        .getDiagnostics(fileUri)
        .filter(d => d.severity === vscode_1.DiagnosticSeverity.Error && isErrorCurrent(editor, d));
}
function textBetween(document, cursor, error) {
    if (error.contains(cursor)) {
        return "";
    }
    else {
        let start;
        let end;
        if (cursor.isBeforeOrEqual(error.start)) {
            start = cursor;
            end = error.start;
        }
        else {
            start = error.end;
            end = cursor;
        }
        return document.getText(new vscode_1.Range(start, end));
    }
}
function isErrorCurrent(editor, error) {
    const between = textBetween(editor.document, editor.selection.active, error.range);
    return /^\s*$/.test(between);
}
let previousError = null;
function setPreviousError(error) {
    previousError = error;
}
function clearPreviousError() {
    previousError = null;
}
function sameAsPrevious(error) {
    return (previousError === null || previousError === void 0 ? void 0 : previousError.code) === error.code && (previousError === null || previousError === void 0 ? void 0 : previousError.range.end.line) === error.range.end.line;
}
//# sourceMappingURL=ErrorTracker.js.map