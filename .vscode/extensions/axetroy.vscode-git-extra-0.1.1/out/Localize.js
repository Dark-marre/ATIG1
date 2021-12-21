"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
const typedi_1 = require("typedi");
let Localize = class Localize {
    constructor() {
        this.context = typedi_1.Container.get("context");
        this.config = JSON.parse(process.env.VSCODE_NLS_CONFIG);
        this.bundle = this.resolveLanguagePack();
    }
    localize(key, ...args) {
        const languagePack = this.bundle;
        const message = languagePack[key] || "";
        return this.format(message, args);
    }
    format(message, args = []) {
        let result;
        if (args.length === 0) {
            result = message;
        }
        else {
            result = message.replace(/\{(\d+)\}/g, (match, rest) => {
                const index = rest[0];
                return typeof args[index] !== "undefined" ? args[index] : match;
            });
        }
        return result;
    }
    resolveLanguagePack() {
        let resolvedLanguage = "";
        const file = this.context.asAbsolutePath("./package");
        const options = this.config;
        if (!options.locale) {
            resolvedLanguage = ".nls.json";
        }
        else {
            let locale = options.locale;
            while (locale) {
                const candidate = ".nls." + locale + ".json";
                if (fs.existsSync(file + candidate)) {
                    resolvedLanguage = candidate;
                    break;
                }
                else {
                    const index = locale.lastIndexOf("-");
                    if (index > 0) {
                        locale = locale.substring(0, index);
                    }
                    else {
                        resolvedLanguage = ".nls.json";
                        locale = null;
                    }
                }
            }
        }
        const languageFilePath = path.join(file + resolvedLanguage);
        try {
            return require(languageFilePath);
        }
        catch (err) {
            return {};
        }
    }
};
Localize = __decorate([
    typedi_1.Service()
], Localize);
exports.Localize = Localize;
//# sourceMappingURL=Localize.js.map