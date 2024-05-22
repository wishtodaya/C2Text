import * as fs from 'fs';
import * as path from 'path';

export interface FolderTree {
    name: string;
    path: string;
    children: (FolderTree | FileTree)[];
}

export interface FileTree {
    name: string;
    path: string;
    content: string;
}

export async function parseFolder(folderPath: string): Promise<FolderTree> {
    const folderName = path.basename(folderPath);
    const folderTree: FolderTree = {
        name: folderName,
        path: '',
        children: []
    };

    await buildFolderTree(folderPath, folderTree, folderPath);

    return folderTree;
}

async function buildFolderTree(currentPath: string, currentNode: FolderTree, rootPath: string): Promise<void> {
    const entries = await fs.promises.readdir(currentPath, { withFileTypes: true });

    for (const entry of entries) {
        const entryPath = path.join(currentPath, entry.name);
        const relativePath = path.relative(rootPath, entryPath);

        if (entry.isDirectory()) {
            const subFolderTree: FolderTree = {
                name: entry.name,
                path: relativePath,
                children: []
            };
            currentNode.children.push(subFolderTree);
            await buildFolderTree(entryPath, subFolderTree, rootPath);
        } else if (entry.isFile()) {
            const fileContent = await fs.promises.readFile(entryPath, 'utf-8');
            const fileTree: FileTree = {
                name: entry.name,
                path: relativePath,
                content: fileContent
            };
            currentNode.children.push(fileTree);
        }
    }
}