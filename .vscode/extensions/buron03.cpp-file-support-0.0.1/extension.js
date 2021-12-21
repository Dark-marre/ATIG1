// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "cpp-file-support" is now active!');

	let disposable = vscode.commands.registerCommand('cpp-file-support.createCppProject', async function () {

		//Create vscode dir
		var folderPath = vscode.workspace.workspaceFolders[0].uri
			.toString()
			.split(":")[1];

		folderPath = folderPath.replace("c%3A", "");

		var dir = await mkdirp(path.join(folderPath, ".vscode"));
		
		//Create file
		async function createFile(content, name)
		{
			//check if file exists
			try {
				if (!fs.existsSync(path.join(dir, name)))
				{
					//write file
					fs.writeFile(path.join(dir, name), content, err => {
						if(err){
							console.error(err);
							return vscode.window.showErrorMessage("Failed to Create Cpp Project");
						}
					});			
				}
			}
			catch(err) {
				return;
			}
		}

		//#region task.json file
		var fileContent = 
`{
	"version": "2.0.0",
	"tasks": [
		{
			"label": "Compile C++ File",
			"type": "shell",
			"command": "g++",
			"args": [
				"-g",
				"$`+`{file}",
				"-o",
				"$`+`{fileDirname}//$`+`{fileBasenameNoExtension}.exe"
			],
			"group": {
				"kind": "build",
				"isDefault": true
			},
			"options": {
				"cwd": "$`+`{workspaceFolder}"
			},
			"problemMatcher": [
				"$gcc"
			]
		},
		{
			"label": "Run C++ File",
			"type": "shell",
			"command": "$`+`{fileDirname}.//$`+`{fileBasenameNoExtension}.exe",
			"problemMatcher": [],
			"group": {
				"kind": "test",
				"isDefault": true
			},
			"dependsOn": [
				"Compile C++ File"
			]
		}
	]
}`;

		await createFile(fileContent, 'tasks.json');
		//#endregion

		//#region c_cpp_properties.json file
		fileContent = 
`{
    "configurations": [
        {
            "name": "Win32",
            "includePath": [
                "$`+`{workspaceFolder}/**"
            ],
            "defines": [
                "_DEBUG",
                "UNICODE",
                "_UNICODE"
            ],
            "cStandard": "c17",
            "cppStandard": "c++17",
            "intelliSenseMode": "msvc-x64", 
            "browse": {
                "path": [
                    "C://MinGW//lib//gcc//mingw32//9.2.0//include//c++"
                ]
            }
        }
    ],
    "version": 4
}`;
		
		await createFile(fileContent, 'c_cpp_properties.json');
		//#endregion
	
		//#region launch.json file

		fileContent = 
`{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "(gdb) Debug",
            "type": "cppdbg",
            "request": "launch",
            "program": "$`+`{fileDirname}//$`+`{fileBasenameNoExtension}.exe",
            "args": [],
            "stopAtEntry": false,
            "cwd": "$`+`{workspaceFolder}",
            "environment": [],
            "externalConsole": true,
            "MIMode": "gdb",
            "miDebuggerPath": "C://MinGW//bin//gdb.exe",
            "setupCommands": [
                {
                    "description": "Habilitar la impresión con sangría para gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ],
            "preLaunchTask": "Compile C++ File"
        }
    ]
}`;

		await createFile(fileContent, 'launch.json');

		//#endregion

		//#region settings.json file

		fileContent = 
`{
    "files.associations": {
        "iostream": "cpp"
    }
}`;
		await createFile(fileContent, 'settings.json');
		//#endregion

		//Create program dir
		dir = await mkdirp(path.join(folderPath, 'program'));

		//#region main.cpp file
		fileContent =
`#include <iostream>

using namespace std;

int main()
{
    cout << "Hello world";
}`;

		await createFile(fileContent, 'main.cpp');

		//#endregion

	});

	context.subscriptions.push(disposable);
}
// @ts-ignore
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	// @ts-ignore
	activate,
	deactivate
}
