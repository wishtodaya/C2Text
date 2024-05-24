import * as path from 'path';
import { FolderTree, FileTree } from './parser';

export function generateStructuredText(projectStructure: FolderTree | FileTree, projectPath: string): string {
    let structureText = generateTreeStructure(projectStructure, '', projectPath);
    let filesText = generateFilesContent(projectStructure, projectPath);
    return structureText + filesText;
}

function generateTreeStructure(node: FolderTree | FileTree, indent: string, projectPath: string): string {
    let structure = '';
    if (isFolder(node)) {
        structure += `${indent}📁 ${node.name}\n`;
        for (const child of node.children) {
            structure += generateTreeStructure(child, indent + '  ', projectPath);
        }
    } else {
        structure += `${indent}📄 ${node.name}\n`;
    }
    return structure;
}

function generateFilesContent(node: FolderTree | FileTree, projectPath: string): string {
    let content = '';
    if (isFolder(node)) {
        for (const child of node.children) {
            content += generateFilesContent(child, projectPath);
        }
    } else {
        const relativePath = path.relative(projectPath, node.path);
        content += `\n===== File: ${relativePath} =====\n`;
        content += `${node.content.trim()}\n`;
        content += `===== End of File: ${relativePath} =====\n\n`;
    }
    return content;
}

function isFolder(node: FolderTree | FileTree): node is FolderTree {
    return (node as FolderTree).children !== undefined;
}