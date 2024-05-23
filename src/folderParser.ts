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
    path: folderPath,
    children: []
  };

  await buildFolderTree(folderPath, folderTree);

  return folderTree;
}

async function buildFolderTree(currentPath: string, currentNode: FolderTree): Promise<void> {
  const entries = await fs.promises.readdir(currentPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(currentPath, entry.name);
    if (entry.isDirectory()) {
      const subFolderTree: FolderTree = {
        name: entry.name,
        path: entryPath,
        children: []
      };
      currentNode.children.push(subFolderTree);
      await buildFolderTree(entryPath, subFolderTree);
    } else if (entry.isFile()) {
      const fileTree: FileTree = {
        name: entry.name,
        path: entryPath,
        content: ''
      };
      currentNode.children.push(fileTree);
    }
  }
}