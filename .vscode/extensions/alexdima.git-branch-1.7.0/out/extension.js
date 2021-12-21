"use strict";
/// <reference path='git.d.ts'/>
Object.defineProperty(exports, "__esModule", { value: true });
const cp = require("child_process");
const path = require("path");
const vscode = require("vscode");
let gitAPI = null;
function activate(ctx) {
    gitAPI = vscode.extensions.getExtension('vscode.git').exports.getAPI(1);
    let treeDataProvider = new TreeDataProvider(ctx);
    vscode.window.registerTreeDataProvider('git-branch.view', treeDataProvider);
    vscode.commands.registerCommand('git-branch.refresh', function () {
        treeDataProvider.refresh();
    });
}
exports.activate = activate;
function getDiff(repository, baseBranch) {
    return new Promise((c, e) => {
        cp.exec(`"${gitAPI.git.path}" diff ${baseBranch} HEAD --name-status`, {
            cwd: repository.rootUri.fsPath,
            maxBuffer: 10 * 1024 * 1024 // 10MB
        }, function (err, diff, stderr) {
            if (err) {
                console.log(err);
                console.log(stderr);
                e(err);
                return;
            }
            c(diff);
        });
    });
}
function getMergeBase(repository) {
    const myConfig = vscode.workspace.getConfiguration('gitBranch');
    if (myConfig.mergeBase) {
        return Promise.resolve(myConfig.mergeBase);
    }
    const masterBranch = myConfig.base || 'master';
    // git merge-base HEAD master
    return new Promise((c, e) => {
        cp.exec(`"${gitAPI.git.path}" merge-base HEAD ${masterBranch}`, {
            cwd: repository.rootUri.fsPath,
            maxBuffer: 10 * 1024 * 1024 // 10MB
        }, function (err, res, stderr) {
            if (err) {
                console.log(err);
                console.log(stderr);
                e(err);
                return;
            }
            c(res.trim());
        });
    });
}
function isDiffGroup(element) {
    return !!element.name;
}
class TreeDataProvider {
    constructor(ctx) {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.ctx = ctx;
        this.refresh();
        gitAPI.onDidOpenRepository((e) => this.refresh());
    }
    refresh() {
        if (gitAPI.repositories.length === 0) {
            this.files = Promise.resolve([]);
            this._onDidChangeTreeData.fire();
            return;
        }
        const repository = gitAPI.repositories[0];
        const myConfig = vscode.workspace.getConfiguration('gitBranch');
        this.files = getMergeBase(repository).then((baseBranch) => {
            return getDiff(repository, baseBranch).then((diff) => {
                const exclude = createMatcher(myConfig.diffExcludes || []);
                const diffGroups = (myConfig.diffGroups || []).map((element) => {
                    return {
                        name: element.name,
                        test: createMatcher(element.files),
                        entries: []
                    };
                });
                diffGroups.unshift({ name: 'Default', test: () => true, entries: [] });
                // let entries = [];
                const lines = diff.split(/\r\n|\r|\n/);
                for (let i = 0; i < lines.length; i++) {
                    const m = lines[i].match(/([\w])\s*(.*)$/);
                    if (m) {
                        const relativePath = m[2];
                        if (exclude(relativePath)) {
                            continue;
                        }
                        let kind = 'modified';
                        if (m[1] === 'A') {
                            kind = 'added';
                        }
                        const entryURI = vscode.Uri.file(path.join(repository.rootUri.fsPath, relativePath));
                        const entry = {
                            uri: entryURI,
                            relativePath: relativePath,
                            kind: kind,
                            original: entryURI.with({
                                scheme: 'git',
                                path: entryURI.path,
                                query: JSON.stringify({
                                    path: entryURI.fsPath,
                                    ref: baseBranch
                                })
                            })
                        };
                        // Find group
                        let hasGroup = false;
                        for (let j = diffGroups.length - 1; j >= 1; j--) {
                            if (diffGroups[j].test(relativePath)) {
                                diffGroups[j].entries.push(entry);
                                hasGroup = true;
                            }
                        }
                        if (!hasGroup) {
                            // Add it to the default group
                            diffGroups[0].entries.push(entry);
                        }
                    }
                }
                return diffGroups;
            });
        });
        this._onDidChangeTreeData.fire();
        function createPrefixMatch(prefix) {
            return function (teststr) {
                return teststr.substr(0, prefix.length) === prefix;
            };
        }
        function createExactMatch(str) {
            return function (teststr) {
                return teststr === str;
            };
        }
        function createMatcher(arr) {
            const matchers = arr.map(function (entry) {
                if (/\*\*$/.test(entry)) {
                    return createPrefixMatch(entry.substr(0, entry.length - 2));
                }
                return createExactMatch(entry);
            });
            return function (teststr) {
                for (let i = 0; i < matchers.length; i++) {
                    if (matchers[i](teststr)) {
                        return true;
                    }
                }
                return false;
            };
        }
    }
    getTreeItem(element) {
        if (isDiffGroup(element)) {
            // this is a group
            return new vscode.TreeItem(element.name, element.name === 'Default' ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.Collapsed);
        }
        const left = element.original;
        const right = element.uri;
        const r = new vscode.TreeItem(element.relativePath);
        r.resourceUri = element.uri;
        r.iconPath = {
            light: this.ctx.asAbsolutePath(`resources/icons/light/status-${element.kind}.svg`),
            dark: this.ctx.asAbsolutePath(`resources/icons/dark/status-${element.kind}.svg`),
        };
        r.command = {
            title: 'Show diff',
            command: 'vscode.diff',
            arguments: [left, right, `${path.basename(element.relativePath)} (BRANCH)`]
        };
        return r;
    }
    getChildren(element) {
        if (!element) {
            return this.files;
        }
        return element.entries;
    }
}
//# sourceMappingURL=extension.js.map