import * as fs from 'fs';
import * as path from 'path';
import { isFolder } from './utils';

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

export async function parseSelected(selectedPath: string): Promise<FolderTree | FileTree | null> {
    try {
        const stats = await fs.promises.stat(selectedPath);
        if (stats.isDirectory()) {
            return await parseFolder(selectedPath);
        } else if (stats.isFile()) {
            return await parseFile(selectedPath);
        } else {
            console.warn('Invalid selection. Please select a file or folder.');
            return null;
        }
    } catch (error) {
        console.error('Error parsing selected file or folder:', error);
        return null;
    }
}

async function parseFolder(folderPath: string): Promise<FolderTree> {
    const folderName = path.basename(folderPath);
    const folderTree: FolderTree = { name: folderName, path: folderPath, children: [] };
    try {
        const entries = await fs.promises.readdir(folderPath, { withFileTypes: true });
        for (const entry of entries) {
            const entryPath = path.join(folderPath, entry.name);
            if (entry.isDirectory()) {
                const subFolderTree = await parseFolder(entryPath);
                folderTree.children.push(subFolderTree);
            } else if (entry.isFile()) {
                const fileTree = await parseFile(entryPath);
                folderTree.children.push(fileTree);
            }
        }
    } catch (error) {
        console.error(`Error parsing folder "${folderPath}":`, error);
    }
    return folderTree;
}

async function parseFile(filePath: string): Promise<FileTree> {
    const fileName = path.basename(filePath);
    try {
        const fileContent = await fs.promises.readFile(filePath, 'utf-8');
        return { name: fileName, path: filePath, content: fileContent };
    } catch (error) {
        console.error(`Error parsing file "${filePath}":`, error);
        return { name: fileName, path: filePath, content: '' };
    }
}