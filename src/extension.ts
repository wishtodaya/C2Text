import * as vscode from 'vscode';
import { parseSelected } from './parser';
import { showUserInterface } from './userInterface';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('c2text.parseSelected', async (uri: vscode.Uri) => {
        if (uri) {
            const selectedPath = uri.fsPath;
            const projectStructure = await parseSelected(selectedPath);
            if (projectStructure) {
                showUserInterface(projectStructure, selectedPath);
            } else {
                vscode.window.showErrorMessage('Failed to parse the selected file or folder.');
            }
        } else {
            vscode.window.showErrorMessage('No file or folder selected.');
        }
    });
    context.subscriptions.push(disposable);
}

export function deactivate() {}
