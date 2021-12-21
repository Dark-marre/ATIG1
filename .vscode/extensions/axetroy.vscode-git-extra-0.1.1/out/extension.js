"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const vscode = require("vscode");
const typedi_1 = require("typedi");
const Git_1 = require("./Git");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        typedi_1.Container.set("context", context);
        const git = typedi_1.Container.get(Git_1.default);
        context.subscriptions.push(vscode.commands.registerCommand("git-extra.commit", git.commit.bind(git)));
        context.subscriptions.push(vscode.commands.registerCommand("git-extra.pull", git.pull.bind(git)));
    });
}
exports.activate = activate;
function deactivate(context) {
    //
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map