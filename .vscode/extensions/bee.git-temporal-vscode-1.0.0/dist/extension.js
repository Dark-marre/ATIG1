module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/extension/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@git-temporal/commons/lib/escapeForCli.js":
/*!****************************************************************!*\
  !*** ./node_modules/@git-temporal/commons/lib/escapeForCli.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function escapeForCli(filepath) {
    if (!filepath || filepath.trim().length === 0) {
        return './';
    }
    return filepath.replace(/([\s\(\)\-])/g, `${process.platform === 'win32' ? '^' : '\\'}$1`);
}
exports.escapeForCli = escapeForCli;


/***/ }),

/***/ "./node_modules/@git-temporal/commons/lib/execSync.js":
/*!************************************************************!*\
  !*** ./node_modules/@git-temporal/commons/lib/execSync.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(__webpack_require__(/*! child_process */ "child_process"));
const logger_1 = __webpack_require__(/*! @git-temporal/logger */ "./node_modules/@git-temporal/logger/lib/logger.js");
function execSync(cmd, options = {}) {
    (options.logFn || logger_1.debug)(`execSync ${JSON.stringify(options)} \n$ ${cmd}`);
    const cmdOptions = Object.assign({ stdio: 'pipe', maxBuffer: 10 * 1024 * 1024 }, options);
    try {
        return child_process_1.default.execSync(cmd, cmdOptions).toString();
    }
    catch (e) {
        throw new Error(`error executing command: ${JSON.stringify({
            cmd,
            options,
            cwd: process.cwd,
            error: (e.stderr && Buffer.from(e.stderr).toString()) || e.toString(),
        })}`);
    }
}
exports.execSync = execSync;


/***/ }),

/***/ "./node_modules/@git-temporal/commons/lib/findGitRoot.js":
/*!***************************************************************!*\
  !*** ./node_modules/@git-temporal/commons/lib/findGitRoot.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(__webpack_require__(/*! path */ "path"));
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const os = __importStar(__webpack_require__(/*! os */ "os"));
const osRoot = os.platform() === 'win32' ? process.cwd().split(path.sep)[0] : '/';
function findGitRoot(startingPath) {
    const parentPath = findInParents(startingPath);
    if (parentPath) {
        return parentPath;
    }
    if (startingPath) {
        return findInParents(null);
    }
    return null;
}
exports.findGitRoot = findGitRoot;
function findInParents(startingPath) {
    let currentPath = (startingPath && path.resolve(startingPath)) || process.cwd();
    try {
        if (!fs.lstatSync(currentPath).isDirectory()) {
            currentPath = path.dirname(currentPath);
        }
    }
    catch (_a) {
        return null;
    }
    let files;
    do {
        files = fs.readdirSync(currentPath);
        if (files.includes('.git')) {
            break;
        }
        currentPath = path.resolve(currentPath, '..');
    } while (currentPath !== osRoot);
    if (currentPath === osRoot && !files.includes('.git')) {
        return null;
    }
    return currentPath;
}


/***/ }),

/***/ "./node_modules/@git-temporal/commons/lib/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/@git-temporal/commons/lib/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./escapeForCli */ "./node_modules/@git-temporal/commons/lib/escapeForCli.js"));
__export(__webpack_require__(/*! ./execSync */ "./node_modules/@git-temporal/commons/lib/execSync.js"));
__export(__webpack_require__(/*! ./findGitRoot */ "./node_modules/@git-temporal/commons/lib/findGitRoot.js"));
__export(__webpack_require__(/*! ./isGitIgnored */ "./node_modules/@git-temporal/commons/lib/isGitIgnored.js"));
__export(__webpack_require__(/*! ./safelyParseInt */ "./node_modules/@git-temporal/commons/lib/safelyParseInt.js"));


/***/ }),

/***/ "./node_modules/@git-temporal/commons/lib/isGitIgnored.js":
/*!****************************************************************!*\
  !*** ./node_modules/@git-temporal/commons/lib/isGitIgnored.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(__webpack_require__(/*! child_process */ "child_process"));
const escapeForCli_1 = __webpack_require__(/*! ./escapeForCli */ "./node_modules/@git-temporal/commons/lib/escapeForCli.js");
function isGitIgnored(path) {
    try {
        return (child_process_1.default
            .execSync(`git check-ignore ${escapeForCli_1.escapeForCli(path)}`, {
            stdio: 'pipe',
        })
            .toString()
            .trim() !== '');
    }
    catch (e) {
        return false;
    }
}
exports.isGitIgnored = isGitIgnored;


/***/ }),

/***/ "./node_modules/@git-temporal/commons/lib/safelyParseInt.js":
/*!******************************************************************!*\
  !*** ./node_modules/@git-temporal/commons/lib/safelyParseInt.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function safelyParseInt(parseableNumber) {
    if (parseableNumber === null || parseableNumber === undefined) {
        return 0;
    }
    const parsedNumber = parseInt(parseableNumber, 10);
    if (isNaN(parsedNumber)) {
        return 0;
    }
    return parsedNumber;
}
exports.safelyParseInt = safelyParseInt;


/***/ }),

/***/ "./node_modules/@git-temporal/git-diff-scraper/lib/gitDiffScraper.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@git-temporal/git-diff-scraper/lib/gitDiffScraper.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const commons_1 = __webpack_require__(/*! @git-temporal/commons */ "./node_modules/@git-temporal/commons/lib/index.js");
const logger_1 = __webpack_require__(/*! @git-temporal/logger */ "./node_modules/@git-temporal/logger/lib/logger.js");
const { debug, error } = logger_1.createProxies('git-diff-scraper');
function getDiff(requestPath = '.', leftCommit, rightCommit) {
    const _leftCommit = leftCommit || 'HEAD';
    const _rightCommit = rightCommit || 'local';
    const gitRoot = commons_1.findGitRoot(requestPath);
    const normalizedRequestPath = normalizeRequestPath(gitRoot, requestPath);
    debug('getDiff', requestPath, _leftCommit, _rightCommit);
    const { contents: leftFileContents, isDirectory } = fetchContents(_leftCommit, requestPath, gitRoot);
    const { contents: rightFileContents } = fetchContents(_rightCommit, requestPath, gitRoot);
    const modifiedFiles = isDirectory &&
        fetchDirectoryDiff(leftCommit, rightCommit, normalizedRequestPath, gitRoot);
    return {
        isDirectory,
        leftFileContents,
        rightFileContents,
        modifiedFiles,
        rightCommit: _rightCommit,
        leftCommit: _leftCommit,
        path: requestPath,
    };
}
exports.getDiff = getDiff;
function fetchContents(commitId, requestPath, gitRoot) {
    debug('fetchContents', { commitId, requestPath, gitRoot });
    return commitId === 'local'
        ? fetchFromLocal(requestPath)
        : fetchFromGit(commitId, requestPath === '.' ? './' : requestPath, gitRoot);
}
function fetchFromGit(commitId, requestPath, gitRoot) {
    const [directory, baseFileName] = requestPath === gitRoot ||
        requestPath === '' ||
        requestPath.match(/^\.[\\/]?$/)
        ? [gitRoot, '']
        : [path_1.default.dirname(requestPath), path_1.default.basename(requestPath)];
    debug('fetchFromGit', { requestPath, gitRoot, directory, baseFileName });
    const normalizedRequestPath = normalizeRequestPath(gitRoot, requestPath);
    const cmd = `show ${commitId}:./${commons_1.escapeForCli(normalizedRequestPath)}`;
    let rawContents;
    try {
        rawContents = execGit(gitRoot, cmd);
    }
    catch (e) {
        debug('fetchFromGit', { error });
        return {
            isDirectory: false,
            contents: null,
        };
    }
    const isDirectory = rawContents.match(/^tree /) !== null;
    if (isDirectory) {
        debug('fetchFromGit', { isDirectory, rawContents });
    }
    return {
        isDirectory,
        contents: isDirectory ? null : Buffer.from(rawContents).toString('base64'),
    };
}
function fetchFromLocal(requestPath) {
    debug('fetchFromLocal', { requestPath });
    if (!fs_1.default.existsSync(requestPath)) {
        return { contents: null, isDirectory: false };
    }
    const isDirectory = fs_1.default.statSync(requestPath).isDirectory();
    const returnValue = {
        isDirectory,
        contents: null,
    };
    if (!isDirectory) {
        returnValue.contents = fs_1.default.readFileSync(requestPath).toString('base64');
    }
    return returnValue;
}
function fetchDirectoryDiff(_leftCommit, _rightCommit, requestPath, gitRoot) {
    const path = requestPath === '.' ? './' : requestPath;
    const leftCommit = _leftCommit || 'HEAD';
    const rightCommit = _rightCommit || 'local';
    const isDiffOnLocal = rightCommit === 'local';
    const leftPath = leftCommit;
    const rightPath = isDiffOnLocal ? path : `${rightCommit} ${path}`;
    const extraOpts = '--stat=300 --compact-summary';
    let outputLines = [];
    try {
        const outputBuffer = execGit(gitRoot, `diff ${extraOpts} ${leftPath} ${rightPath}`);
        outputLines = outputBuffer.toString().split('\n');
    }
    catch (e) {
        error('Error retrieving git diff', (e.stderr && e.stderr.toString()) || e.toString());
    }
    return parseDirectoryDiff(outputLines);
}
function parseDirectoryDiff(outputLines) {
    debug('parseDirectoryDiff', outputLines);
    const modifiedFiles = [];
    for (const line of outputLines) {
        let matches = line.match(/(.*)\((gone|new)\).*\|\s*(\d*)/);
        if (matches) {
            const [fileName, newOrGone, delta] = matches.slice(1);
            const status = newOrGone === 'new' ? 'added' : 'deleted';
            modifiedFiles.push(makeFile(fileName, delta, status));
        }
        else {
            matches = line.match(/^([^|]*)\|\s*(\d*)/);
            if (matches) {
                const [fileName, delta] = matches.slice(1);
                modifiedFiles.push(makeFile(fileName, delta));
            }
        }
    }
    return modifiedFiles.sort(fileNameComparator);
}
function makeFile(fileName, delta, status = 'modified') {
    return {
        status,
        path: fileName.trim(),
        delta: parseInt(delta, 10),
    };
}
function fileNameComparator(a, b) {
    return a.path.localeCompare(b.path);
}
function normalizeRequestPath(gitRoot, requestPath) {
    if (!gitRoot) {
        return requestPath;
    }
    if (gitRoot === requestPath) {
        return './';
    }
    const parsedRequestPath = path_1.default.parse(requestPath);
    if (parsedRequestPath.root === '') {
        return requestPath;
    }
    const relativeDir = parsedRequestPath.dir.slice(gitRoot.length + 1);
    debug(`normalizeRequestPath ${gitRoot},
      ${relativeDir},
      ${parsedRequestPath.dir},
      ${parsedRequestPath.base}`);
    return path_1.default.join(relativeDir, parsedRequestPath.base);
}
function execGit(gitRoot, gitCmd) {
    return commons_1.execSync(`git ${gitCmd}`, { cwd: gitRoot, logFn: debug });
}


/***/ }),

/***/ "./node_modules/@git-temporal/git-log-scraper/lib/gitLogScraper.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@git-temporal/git-log-scraper/lib/gitLogScraper.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const commons_1 = __webpack_require__(/*! @git-temporal/commons */ "./node_modules/@git-temporal/commons/lib/index.js");
const logger_1 = __webpack_require__(/*! @git-temporal/logger */ "./node_modules/@git-temporal/logger/lib/logger.js");
const { debug } = logger_1.createProxies('git-log-scraper');
const parsedAttributes = {
    id: '%H%n',
    hash: '%h%n',
    authorName: '%an%n',
    authorEmail: '%ae%n',
    relativeDate: '%cr%n',
    authorDate: '%at%n',
    message: '%s%n',
    body: '%b',
};
function getCommitHistory(path, options = { skip: 0, maxCount: 0 }) {
    const { skip, maxCount } = options;
    const rawLog = fetchFileHistory(path, skip, maxCount);
    const commits = parseGitLogOutput(rawLog)
        .sort((a, b) => {
        return b.authorDate - a.authorDate;
    })
        .map((c, i) => (Object.assign({}, c, { index: skip + i })));
    const isFile = fs.existsSync(path) && !fs.lstatSync(path).isDirectory();
    return {
        isFile,
        commits,
        skip,
        maxCount,
        path,
    };
}
exports.getCommitHistory = getCommitHistory;
function getCommitRange(fileName) {
    const gitRoot = commons_1.findGitRoot(fileName);
    const logFlags = gitLogFlags({ follow: false });
    debug('getCommitRange', { fileName, gitRoot, logFlags });
    const cmdFileName = fileName === gitRoot ? '.' : fileName;
    const allRevHashes = execGit(gitRoot, `log --pretty="format:%H" --topo-order --date=local -- ${commons_1.escapeForCli(cmdFileName)}`).split('\n');
    const firstCommitRaw = execGit(gitRoot, `log ${logFlags} -n1 ${allRevHashes[allRevHashes.length - 1]}`);
    const firstCommit = parseGitLogOutput(firstCommitRaw)[0];
    const lastCommitRaw = execGit(gitRoot, `log ${logFlags} -n 1 -- ${commons_1.escapeForCli(fileName)}`);
    const lastCommit = parseGitLogOutput(lastCommitRaw)[0];
    const absoluteFileName = fileName.startsWith(gitRoot)
        ? fileName
        : path.resolve(gitRoot, fileName);
    const existsLocally = fs.existsSync(absoluteFileName);
    const hasChanges = existsLocally && hasUncommitedChanges(gitRoot, fileName);
    return {
        gitRoot,
        firstCommit,
        lastCommit,
        existsLocally,
        count: allRevHashes.length,
        path: fileName,
        hasUncommittedChanges: hasChanges,
    };
}
exports.getCommitRange = getCommitRange;
function hasUncommitedChanges(gitroot, fileName) {
    const statusRaw = execGit(gitroot, `status ${fileName}`);
    return statusRaw.match(/(new\sfile|modified|deleted)\:/i) !== null;
}
function fetchFileHistory(fileName, skip, maxCount) {
    const gitRoot = commons_1.findGitRoot(fileName);
    const flags = gitLogFlags();
    const skipFlag = skip ? ` --skip=${skip}` : '';
    const countFlag = maxCount ? ` -n ${maxCount}` : '';
    return execGit(gitRoot, `log ${flags}${skipFlag}${countFlag} -- ${commons_1.escapeForCli(fileName)}`);
}
function gitLogFlags(options = { follow: true }) {
    let format = '';
    for (const attr in parsedAttributes) {
        format += `${attr}:${parsedAttributes[attr]}`;
    }
    const follow =  false ? undefined : '';
    return `--pretty=\"format:${format}\" --topo-order --date=local --numstat ${follow}`;
}
function execGit(gitRoot, gitCmd) {
    return commons_1.execSync(`git ${gitCmd}`, { cwd: gitRoot, logFn: debug });
}
function parseGitLogOutput(output) {
    const logItems = [];
    const logLines = output.split(/\n\r?/);
    let commitIndex = 0;
    let currentlyParsingAttr = null;
    let parsedValue = null;
    let commitObj = null;
    let totalLinesAdded = 0;
    let totalLinesDeleted = 0;
    const addLogItem = () => {
        if (!commitObj) {
            return;
        }
        commitObj.linesAdded = totalLinesAdded;
        commitObj.linesDeleted = totalLinesDeleted;
        commitObj.index = commitIndex;
        logItems.push(commitObj);
        totalLinesAdded = 0;
        totalLinesDeleted = 0;
        commitIndex += 1;
    };
    for (const line of logLines) {
        let matches = line.match(/^id\:(.*)/);
        if (matches) {
            currentlyParsingAttr = 'id';
            addLogItem();
            commitObj = {
                id: matches[1],
                files: [],
                body: '',
                message: '',
            };
            continue;
        }
        matches = line.match(/^([^\:]+):(.*)/);
        if (matches) {
            let attr;
            [, attr, parsedValue] = matches;
            if (attr === 'authorDate') {
                parsedValue = parseInt(parsedValue, 10);
            }
            if (Object.keys(parsedAttributes).includes(attr)) {
                currentlyParsingAttr = attr;
                commitObj[currentlyParsingAttr] = parsedValue;
                continue;
            }
        }
        if ((matches = line.match(/^([\d\-]+)\s+([\d\-]+)\s+(.*)/))) {
            let [linesAdded, linesDeleted, fileName] = matches.slice(1);
            linesAdded = commons_1.safelyParseInt(linesAdded);
            linesDeleted = commons_1.safelyParseInt(linesDeleted);
            fileName = fileName.trim();
            currentlyParsingAttr = 'files';
            totalLinesAdded += linesAdded;
            totalLinesDeleted += linesDeleted;
            commitObj.files.push({
                linesAdded,
                linesDeleted,
                name: fileName,
            });
        }
        else if (currentlyParsingAttr === 'body') {
            commitObj.body += `<br>${line}`;
        }
    }
    if (commitObj) {
        addLogItem();
    }
    return logItems;
}


/***/ }),

/***/ "./node_modules/@git-temporal/logger/lib/logger.js":
/*!*********************************************************!*\
  !*** ./node_modules/@git-temporal/logger/lib/logger.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function createProxies(prefix) {
    return {
        error: (...args) => proxy(error, prefix, ...args),
        log: (...args) => proxy(log, prefix, ...args),
        debug: (...args) => proxy(debug, prefix, ...args),
    };
}
exports.createProxies = createProxies;
function error(...args) {
    proxy(writeLog, 'ERROR', ...args);
}
exports.error = error;
function warn(...args) {
    proxy(writeLog, 'WARN', ...args);
}
exports.warn = warn;
function log(...args) {
    proxy(writeLog, 'info', ...args);
}
exports.log = log;
function debug(...args) {
    const isDebugOnWindow = typeof window !== 'undefined' && window.GTDEBUG;
    if ((process && process.env.GTDEBUG) || isDebugOnWindow) {
        proxy(writeLog, 'debug', ...args);
    }
}
exports.debug = debug;
const proxy = (fn, prefix, ...args) => {
    const [message, ...others] = args;
    fn(`${prefix}: ${message}`, ...others);
};
function writeLog(_message, ..._others) {
    let [message, others] = [_message, _others];
    const logFn = message.startsWith('ERROR')
        ? console.error
        : message.startsWith('WARN')
            ? console.warn
            : console.log;
    if (others) {
        message = `${message} ${JSON.stringify(others, null, 2)}`;
        others = [];
    }
    logFn(message, ...others);
}
exports.default = { createProxies, error, log, debug };


/***/ }),

/***/ "./src/extension/WebviewPanel.ts":
/*!***************************************!*\
  !*** ./src/extension/WebviewPanel.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(__webpack_require__(/*! path */ "path"));
const vscode = __importStar(__webpack_require__(/*! vscode */ "vscode"));
const logger_1 = __webpack_require__(/*! ../utilities/logger */ "./src/utilities/logger.ts");
const dispatchMessage_1 = __webpack_require__(/*! ./dispatchMessage */ "./src/extension/dispatchMessage.ts");
let activeTextEditor;
let explorerFile;
process.env.GTDEBUG = '1';
class WebviewPanel {
    constructor(panel, extensionPath) {
        this._disposables = [];
        this.dispose = () => {
            logger_1.debug('disposing WebviewPanel.html');
            WebviewPanel.currentPanel = undefined;
            this._panel.dispose();
            while (this._disposables.length) {
                const x = this._disposables.pop();
                if (x) {
                    x.dispose();
                }
            }
        };
        this.dispatchMessage = message => {
            const resp = dispatchMessage_1.dispatchMessage(message);
            if (resp) {
                this._panel.webview.postMessage(resp);
            }
        };
        this.update = () => {
            if (!this._panel.visible) {
                return;
            }
            logger_1.debug('updating WebviewPanel.html');
            this._panel.title = 'Git Temporal';
            this._panel.webview.html = this.getHtmlForWebview();
        };
        this._panel = panel;
        this._extensionPath = extensionPath;
        this.update();
        this._panel.onDidDispose(this.dispose, null, this._disposables);
        this._panel.onDidChangeViewState(this.update, null, this._disposables);
        this._panel.webview.onDidReceiveMessage(this.dispatchMessage, null, this._disposables);
    }
    static createOrShow(extensionPath, currentExplorerFile) {
        activeTextEditor = vscode.window.activeTextEditor;
        explorerFile = currentExplorerFile;
        if (WebviewPanel.currentPanel) {
            WebviewPanel.currentPanel._panel.reveal();
            WebviewPanel.currentPanel.update();
            return;
        }
        logger_1.debug('createOrShow', { extensionPath, currentExplorerFile });
        const panel = vscode.window.createWebviewPanel(WebviewPanel.viewType, 'Git Temporal', vscode.ViewColumn.Active, {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(extensionPath, 'dist'))],
        });
        WebviewPanel.currentPanel = new WebviewPanel(panel, extensionPath);
    }
    static revive(panel, extensionPath) {
        WebviewPanel.currentPanel = new WebviewPanel(panel, extensionPath);
    }
    getHtmlForWebview() {
        const scriptPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'dist', 'git-temporal-react.vscode.js'));
        const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' });
        const nonce = getNonce();
        const currentPath = (explorerFile && explorerFile.fsPath) ||
            activeTextEditor.document.fileName;
        const initialLineNumber = explorerFile
            ? 0
            : activeTextEditor.visibleRanges[0].start.line;
        logger_1.debug('webviewPanel currentPath', [
            currentPath,
            explorerFile,
            initialLineNumber,
        ]);
        return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}'; style-src 'unsafe-inline'; connect-src 'unsafe-inline'">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Git Temporal</title>
      </head>
      <body style="padding-top: 20px; padding-right: 20px; overflow: hidden">
        <div
          id="gitTemporal"
          data-current-path="${currentPath}"
          data-initial-line-number="${initialLineNumber}">
          Loading...
        </div>
        <script nonce=${nonce}>
          window.GT_STYLE_VARS = {
            colors: ${JSON.stringify(getColors())},
            margins: ${JSON.stringify(getMargins())}
          }
        </script>
        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>
    `;
    }
}
exports.WebviewPanel = WebviewPanel;
function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function getColors() {
    return {
        altBackground: 'var(--vscode-sideBar-background)',
        altForeground: 'var(--vscode-sideBar-foreground)',
        background: 'var(--vscode-editor-background)',
        blobColor: 'var(--vscode-foreground)',
        linkText: 'var(--vscode-editorLink-activeForeground)',
        inputBackground: 'var(--vscode-input-background)',
        inputForeground: 'var(--vscode-input-foreground)',
        text: 'var(--vscode-foreground)',
        z: 'var(--vscode-)',
    };
}
function getMargins() {
    return {
        pageTop: 5,
        pageLeft: 0,
        pageBottom: 10,
        pageRight: 20,
    };
}


/***/ }),

/***/ "./src/extension/dispatchMessage.ts":
/*!******************************************!*\
  !*** ./src/extension/dispatchMessage.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(__webpack_require__(/*! vscode */ "vscode"));
const logger_1 = __webpack_require__(/*! ../utilities/logger */ "./src/utilities/logger.ts");
const git_log_scraper_1 = __webpack_require__(/*! @git-temporal/git-log-scraper */ "./node_modules/@git-temporal/git-log-scraper/lib/gitLogScraper.js");
const git_diff_scraper_1 = __webpack_require__(/*! @git-temporal/git-diff-scraper */ "./node_modules/@git-temporal/git-diff-scraper/lib/gitDiffScraper.js");
function dispatchMessage(message) {
    logger_1.debug('got message', message);
    switch (message.command) {
        case 'alert':
            vscode.window.showErrorMessage(message.text);
            return null;
        case 'commitRange':
            return dispatchCommitRange(message);
        case 'history':
            return dispatchHistory(message);
        case 'diff':
            return dispatchDiff(message);
    }
    throw new Error(`Unrecognized command received from git-temporal webview (${JSON.stringify(message)})`);
}
exports.dispatchMessage = dispatchMessage;
function dispatchCommitRange({ path }) {
    const commitRange = git_log_scraper_1.getCommitRange(path);
    return Object.assign({}, commitRange, { path, type: 'commitRange' });
}
function dispatchHistory({ path, skip, maxCount }) {
    const commitHistory = git_log_scraper_1.getCommitHistory(path, { skip, maxCount });
    return Object.assign({}, commitHistory, { type: 'history' });
}
function dispatchDiff({ path, leftCommit, rightCommit }) {
    const diff = git_diff_scraper_1.getDiff(path, leftCommit, rightCommit);
    return Object.assign({}, diff, { path, type: 'diff' });
}


/***/ }),

/***/ "./src/extension/index.ts":
/*!********************************!*\
  !*** ./src/extension/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(__webpack_require__(/*! vscode */ "vscode"));
const WebviewPanel_1 = __webpack_require__(/*! ./WebviewPanel */ "./src/extension/WebviewPanel.ts");
const logger_1 = __webpack_require__(/*! ../utilities/logger */ "./src/utilities/logger.ts");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('gitTemporal.start', explorerFile => {
        logger_1.debug('got start', explorerFile);
        WebviewPanel_1.WebviewPanel.createOrShow(context.extensionPath, explorerFile);
    }));
    if (vscode.window.registerWebviewPanelSerializer) {
        vscode.window.registerWebviewPanelSerializer(WebviewPanel_1.WebviewPanel.viewType, {
            deserializeWebviewPanel(webviewPanel, state) {
                return __awaiter(this, void 0, void 0, function* () {
                    logger_1.debug(`Got state: ${state}`);
                    WebviewPanel_1.WebviewPanel.revive(webviewPanel, context.extensionPath);
                });
            },
        });
    }
}
exports.activate = activate;


/***/ }),

/***/ "./src/utilities/logger.ts":
/*!*********************************!*\
  !*** ./src/utilities/logger.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __webpack_require__(/*! @git-temporal/logger */ "./node_modules/@git-temporal/logger/lib/logger.js");
_a = logger_1.createProxies('git-temporal-vscode'), exports.error = _a.error, exports.warn = _a.warn, exports.log = _a.log, exports.debug = _a.debug;


/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "vscode":
/*!*************************!*\
  !*** external "vscode" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vscode");

/***/ })

/******/ });
//# sourceMappingURL=extension.js.map