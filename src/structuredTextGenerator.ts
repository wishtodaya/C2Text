import * as fs from 'fs';
import { FolderTree, FileTree } from './folderParser';

const FILE_SEPARATOR = '===============================\n';

export function generateStructuredText(projectStructure: FolderTree): string {
  let structuredText = '';

  structuredText += generateFolderStructure(projectStructure, '');
  structuredText += generateFilePathsAndContents(projectStructure, '');

  return structuredText;
}

function generateFolderStructure(node: FolderTree | FileTree, indent: string): string {
  if ('children' in node) {
    let structure = `${indent}📁 ${node.name}\n`;

    for (const child of node.children) {
      structure += generateFolderStructure(child, indent + '  ');
    }

    return structure;
  }

  return '';
}

function generateFilePathsAndContents(node: FolderTree | FileTree, indent: string): string {
  if ('children' in node) {
    let structure = '';

    for (const child of node.children) {
      structure += generateFilePathsAndContents(child, indent);
    }

    return structure;
  } else {
    const fileContent = fs.readFileSync(node.path, 'utf-8');
    return `${FILE_SEPARATOR}${indent}📄 ${node.name}\nPath: ${node.path}\nContent:\n${fileContent.trim()}\n\n`;
  }
}