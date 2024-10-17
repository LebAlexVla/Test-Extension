// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';

// Extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Will only be executed once when extension is activated
	console.log('Congratulations, your extension "printvariable" is now active!');

	// Register the command from package.json file
	let disposable = vscode.commands.registerCommand('extension.PrintVariable', () => {
        const editor = vscode.window.activeTextEditor;

		// Check if there is an active text editor
        if (editor) {
			// Get selected
            const select = editor.selection;
			// Clean from whitespaces and etc
            const variable = editor.document.getText(select).trim();

			// If selected is something
            if (variable) {
				// Get line of selection end
                const line = editor.document.lineAt(select.end.line);
				// Create line under previous
                const position = new vscode.Position(line.range.end.line + 1, 0);
                // Get all whitespaces and tabs
                const indent = line.text.split(/\S/)[0];
				// Create a new line to insert
                const new_line = `${indent}std::cout << ${variable} << std::endl;`;
				// Insert the line
                editor.edit(editBuilder => {
                    editBuilder.insert(position, new_line);
                    editBuilder.insert(position, '\n');
                });
            }
			// If nothing is selected
			else
                vscode.window.showWarningMessage('You should select a variable');
        }
    });

	// for delete after deactivation of the extension
    context.subscriptions.push(disposable);

    // Register a keybinding command
    let disposableKeybinding = vscode.commands.registerCommand('extension.PrintVariable', () => {});

	// Add the keybinding command to the context subscriptions
    context.subscriptions.push(disposableKeybinding);
}

// Extension is deactivated
export function deactivate() {}