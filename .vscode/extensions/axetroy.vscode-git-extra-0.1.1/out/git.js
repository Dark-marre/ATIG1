"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const os = require("os");
const simpleGit = require("simple-git");
const execa = require("execa");
const typedi_1 = require("typedi");
const Localize_1 = require("./Localize");
const homeDir = os.homedir();
let Git = class Git {
    hasUncommitFiles(cwd) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield execa("git", ["diff", "--name-only"], { cwd });
            return Boolean(result.stdout);
        });
    }
    generateCommitMessage(meta) {
        const { type, scope, subject: subjectTemp, body, footer } = meta;
        const firstChartSubject = subjectTemp[0].toLowerCase();
        const arr = subjectTemp.split("");
        arr[0] = firstChartSubject;
        const subject = arr.join("");
        let message = `${type}${scope ? "(" + scope.trim() + ")" : ""}: ${subject}`;
        if (body) {
            message += "\n" + body;
        }
        if (footer) {
            message += "\n" + footer;
        }
        return message.trim();
    }
    parseOutput(output) {
        output = output.trim();
        const filesCol = output.split("\n");
        const result = [];
        for (const col of filesCol) {
            const arr = col.split(/\s/);
            const modeRaw = arr[0];
            const mode = modeRaw.indexOf("?") >= 0 ? undefined : modeRaw; // change mode
            const file = arr[1];
            result.push({
                file,
                mode
            });
        }
        return result;
    }
    getGitStatus(cwd) {
        return __awaiter(this, void 0, void 0, function* () {
            const ps = yield execa("git", ["status", "--untracked-files=all", "--porcelain"], { cwd });
            return this.parseOutput(ps.stdout);
        });
    }
    getUnStageFiles(cwd) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getGitStatus(cwd)).filter(v => !v.mode).map(v => v.file);
        });
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            let cwd = vscode.workspace.rootPath;
            const workspaceFolders = vscode.workspace.workspaceFolders || [];
            if (workspaceFolders.length > 1) {
                const picker = yield vscode.window.showQuickPick(workspaceFolders.map(v => {
                    return {
                        label: v.name,
                        description: v.uri.path.replace(new RegExp("^" + homeDir, "i"), "~"),
                        path: v.uri.path
                    };
                }), { placeHolder: this.i18n.localize("placeholder.wordspace") });
                if (!picker) {
                    return;
                }
                cwd = picker.path;
            }
            if (!cwd) {
                return;
            }
            const hasUncommitFiles = yield this.hasUncommitFiles(cwd);
            if (!hasUncommitFiles) {
                vscode.window.showInformationMessage(this.i18n.localize("tip.message.nofile"));
                return;
            }
            const unstageFiles = yield this.getUnStageFiles(cwd);
            const type = yield vscode.window.showQuickPick([
                {
                    label: "feat",
                    description: this.i18n.localize("selection.feat.desc"),
                    value: "feat"
                },
                {
                    label: "fix",
                    description: this.i18n.localize("selection.fix.desc"),
                    value: "fix"
                },
                {
                    label: "docs",
                    description: this.i18n.localize("selection.docs.desc"),
                    value: "docs"
                },
                {
                    label: "style",
                    description: this.i18n.localize("selection.style.desc"),
                    value: "style"
                },
                {
                    label: "refactor",
                    description: this.i18n.localize("selection.refactor.desc"),
                    value: "refactor"
                },
                {
                    label: "test",
                    description: this.i18n.localize("selection.test.desc"),
                    value: "test"
                },
                {
                    label: "chroe",
                    description: this.i18n.localize("selection.chroe.desc"),
                    value: "chore"
                }
            ], {
                placeHolder: unstageFiles.length
                    ? this.i18n.localize("common.stage", unstageFiles.length)
                    : this.i18n.localize("placeholder.type")
            });
            if (!type) {
                return;
            }
            const isSimpleMode = vscode.workspace
                .getConfiguration("git-extra")
                .get("simple");
            let scope = "";
            if (!isSimpleMode) {
                const r = yield vscode.window.showInputBox({
                    placeHolder: this.i18n.localize("placeholder.scope"),
                    prompt: this.generateCommitMessage({
                        type: type.value,
                        scope: "[scope]",
                        subject: "<subject>",
                        body: "",
                        footer: ""
                    })
                });
                if (r) {
                    scope = r;
                }
                else if (r === undefined) {
                    // cancel
                    return;
                }
            }
            const subject = yield vscode.window.showInputBox({
                placeHolder: this.i18n.localize("placeholder.subject"),
                prompt: this.generateCommitMessage({
                    type: type.value,
                    scope,
                    subject: "<subject>",
                    body: "",
                    footer: ""
                })
            });
            if (!subject) {
                return;
            }
            let body = "";
            if (!isSimpleMode) {
                const r = yield vscode.window.showInputBox({
                    placeHolder: this.i18n.localize("placeholder.body"),
                    prompt: this.generateCommitMessage({
                        type: type.value,
                        scope,
                        subject,
                        body: "[body]",
                        footer: ""
                    })
                });
                if (r) {
                    body = r;
                }
                else if (r === undefined) {
                    // cancel
                    return;
                }
            }
            const message = this.generateCommitMessage({
                type: type.value,
                scope,
                subject,
                body,
                footer: ""
            });
            const git = simpleGit(cwd);
            // TODO: select which file should be add to workspace
            // wait VS Code implement the checkbox list API
            if (hasUncommitFiles) {
                // new file will not be stage
                // user should add them to stage space by manual
                yield vscode.commands.executeCommand("git.stage");
            }
            const result = yield new Promise((resolve, reject) => {
                git.commit(message, (err, r) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(r);
                });
            });
            // refresh git explorer
            yield vscode.commands.executeCommand("git.refresh");
            // if success
            if (result.commit) {
                const action = this.i18n.localize("action.push");
                const r = yield vscode.window.showInformationMessage(`Commit as ${result.commit}`, action);
                if (r && r === action) {
                    this.push();
                }
            }
        });
    }
    push() {
        return __awaiter(this, void 0, void 0, function* () {
            yield vscode.commands.executeCommand("git.push");
        });
    }
    pull() {
        return __awaiter(this, void 0, void 0, function* () {
            yield vscode.commands.executeCommand("git.pull");
        });
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", Localize_1.Localize)
], Git.prototype, "i18n", void 0);
Git = __decorate([
    typedi_1.Service()
], Git);
exports.default = Git;
//# sourceMappingURL=Git.js.map