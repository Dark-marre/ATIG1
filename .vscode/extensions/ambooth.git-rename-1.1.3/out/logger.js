"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logger(channel) {
    return function (str) {
        console.log(str);
        channel.appendLine(str);
    };
}
exports.default = logger;
//# sourceMappingURL=logger.js.map