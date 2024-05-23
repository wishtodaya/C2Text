import { FolderTree, FileTree } from './parser';

export function getWebviewContent(projectStructure: FolderTree | FileTree): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>C2Text - Select Items to Parse</title>
        <style>
            ${getStyles()}
        </style>
    </head>
    <body>
        <h1>Select Items to Parse</h1>
        <div id="itemTree">
            ${generateItemTreeHtml(projectStructure)}
        </div>
        <button id="generateButton">Generate Structured Text</button>
        <script>
            ${getScripts()}
        </script>
    </body>
    </html>
    `;
}

function getStyles(): string {
    return `
    body {
        font-family: 'Segoe UI', sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f8f8f8;
    }
    h1 {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 20px;
        color: #333;
    }
    #itemTree {
        margin-bottom: 20px;
        padding: 15px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    .folder-label, .file-label {
        display: flex;
        align-items: center;
        padding: 6px 0;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .folder-label:hover, .file-label:hover {
        background-color: #f0f0f0;
    }
    .folder-icon, .file-icon {
        margin-right: 8px;
    }
    .folder-name {
        font-weight: 600;
    }
    .item-contents {
        margin-left: 24px;
    }
    button {
        padding: 12px 24px;
        font-size: 16px;
        font-weight: 600;
        background-color: #007acc;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    button:hover {
        background-color: #005999;
    }
    button:active {
        background-color: #004c80;
    }
    `;
}

function getScripts(): string {
    return `
    const vscode = acquireVsCodeApi();
    function toggleCheckbox(checkbox) {
        if (checkbox.checked) {
            const childCheckboxes = checkbox.parentElement.nextElementSibling.querySelectorAll('input[type="checkbox"]');
            childCheckboxes.forEach(child => child.checked = true);
        } else {
            const childCheckboxes = checkbox.parentElement.nextElementSibling.querySelectorAll('input[type="checkbox"]');
            childCheckboxes.forEach(child => child.checked = false);
        }
    }
    document.getElementById('generateButton').addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const selectedPaths = Array.from(checkboxes).map(checkbox => checkbox.value);
        vscode.postMessage({ command: 'generateStructuredText', selectedPaths: selectedPaths });
    });
    `;
}

function generateItemTreeHtml(node: FolderTree | FileTree, indent: string = ''): string {
    let html = '';
    if (isFolder(node)) {
        html += `
        <div>
            <label class="folder-label">
                <input type="checkbox" value="${node.path}" onchange="toggleCheckbox(this)">
                <span class="folder-icon">📁</span>
                <span class="folder-name">${node.name}</span>
            </label>
            <div class="item-contents">
                ${node.children.map(child => generateItemTreeHtml(child, indent + '  ')).join('')}
            </div>
        </div>
        `;
    } else {
        html += `
        <div>
            <label class="file-label">
                <input type="checkbox" value="${node.path}">
                <span class="file-icon">📄</span>
                <span>${node.name}</span>
            </label>
        </div>
        `;
    }
    return html;
}

function isFolder(node: FolderTree | FileTree): node is FolderTree {
    return (node as FolderTree).children !== undefined;
}