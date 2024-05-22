import * as vscode from 'vscode';
import { selectFolder } from './folderSelector';
import { parseFolder } from './folderParser';
import { generateProjectStructure } from './projectStructureGenerator';
import { saveToFile } from './fileSaver';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('c2text.parseFolder', async () => {
        const folderPath = await selectFolder();
        if (folderPath) {
            const folderTree = await parseFolder(folderPath);
            const projectStructure = generateProjectStructure(folderTree);
            await saveToFile(projectStructure, folderPath);
            vscode.window.showInformationMessage('Project structure generated successfully!');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}