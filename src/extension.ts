import * as vscode from 'vscode';
import { parseFolder } from './folderParser';
import { showUserInterface } from './userInterface';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('c2text.parseSelectedFolder', async (folder: vscode.Uri) => {
    if (folder && folder.fsPath) {
      const folderTree = await parseFolder(folder.fsPath);
      showUserInterface(folderTree, folder.fsPath);
    } else {
      vscode.window.showErrorMessage('No folder selected.');
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}