import * as vscode from 'vscode';
import { FolderTree, FileTree } from './parser';
import { generateStructuredText } from './structuredTextGenerator';
import { saveToFile } from './fileSaver';
import { getWebviewContent } from './webviewContent';

export function showUserInterface(projectStructure: FolderTree | FileTree, projectPath: string): void {
    const panel = vscode.window.createWebviewPanel(
        'c2textUserInterface',
        'C2Text - Select Items to Parse',
        vscode.ViewColumn.One,
        { enableScripts: true }
    );

    panel.webview.html = getWebviewContent(projectStructure);

    panel.webview.onDidReceiveMessage(async (message) => {
        switch (message.command) {
            case 'generateStructuredText':
                const selectedPaths = message.selectedPaths;
                const filteredStructure = filterProjectStructure(projectStructure, selectedPaths);
                const structuredText = generateStructuredText(filteredStructure, projectPath);
                await saveToFile(structuredText, projectPath);
                vscode.window.showInformationMessage('Structured text generated successfully!');
                break;
        }
    });
}

function filterProjectStructure(projectStructure: FolderTree | FileTree, selectedPaths: string[]): FolderTree | FileTree {
    if (isFolder(projectStructure)) {
        const filteredChildren = projectStructure.children
            .filter(child => selectedPaths.includes(child.path) || selectedPaths.some(path => path.startsWith(child.path)))
            .map(child => {
                if (isFolder(child)) {
                    return filterProjectStructure(child, selectedPaths);
                } else {
                    return child;
                }
            });
        return { ...projectStructure, children: filteredChildren };
    }
    return projectStructure;
}

function isFolder(node: FolderTree | FileTree): node is FolderTree {
    return (node as FolderTree).children !== undefined;
}