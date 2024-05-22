import { FolderTree, FileTree } from './folderParser';

export function generateProjectStructure(folderTree: FolderTree): string {
    let structure = '';

    // Generate folder structure
    structure += generateFolderStructure(folderTree, '');

    // Generate file paths and contents
    structure += generateFilePathsAndContents(folderTree, '');

    return structure;
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
        return `${indent}📄 ${node.name}\nPath: ${node.path}\nContent:\n${node.content.trim()}\n\n`;
    }
}