import { FolderTree, FileTree } from './parser';

export function isFolder(node: FolderTree | FileTree): node is FolderTree {
    return (node as FolderTree).children !== undefined;
}