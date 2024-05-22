import * as vscode from 'vscode';

export async function selectFolder(): Promise<string | undefined> {
    const folderUri = await vscode.window.showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false,
        openLabel: 'Select Folder'
    });

    if (folderUri && folderUri[0]) {
        return folderUri[0].fsPath;
    }
    return undefined;
}