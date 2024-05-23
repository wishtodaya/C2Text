import * as vscode from 'vscode';
import { FolderTree, FileTree } from './folderParser';
import { generateStructuredText } from './structuredTextGenerator';
import { saveToFile } from './fileSaver';

export function showUserInterface(projectStructure: FolderTree, projectPath: string): void {
  const panel = vscode.window.createWebviewPanel(
    'c2textUserInterface',
    'C2Text - Select Files to Parse',
    vscode.ViewColumn.One,
    {
      enableScripts: true
    }
  );

  panel.webview.html = generateWebviewContent(projectStructure);

  panel.webview.onDidReceiveMessage(async (message) => {
    switch (message.command) {
      case 'generateStructuredText':
        const selectedPaths = message.selectedPaths;
        const filteredStructure = filterProjectStructure(projectStructure, selectedPaths);
        const structuredText = generateStructuredText(filteredStructure);
        await saveToFile(structuredText, projectPath);
        vscode.window.showInformationMessage('Structured text generated successfully!');
        break;
      case 'toggleFolder':
        panel.webview.postMessage({ command: 'toggleFolder', path: message.path });
        break;
    }
  });
}

function generateWebviewContent(projectStructure: FolderTree): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>C2Text - Select Files to Parse</title>
      <style>
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
        #fileTree {
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
        .folder-contents {
          margin-left: 24px;
          display: none;
        }
        .folder-contents.show {
          display: block;
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
      </style>
    </head>
    <body>
      <h1>Select Files to Parse</h1>
      <div id="fileTree">
        ${generateFileTreeHtml(projectStructure)}
      </div>
      <button id="generateButton">Generate Structured Text</button>
      <script>
        const vscode = acquireVsCodeApi();

        function toggleFolder(folderPath) {
          const folderContents = document.querySelector(\`[data-folder-path="\${folderPath}"]\`);
          folderContents.classList.toggle('show');
          vscode.postMessage({ command: 'toggleFolder', path: folderPath });
        }

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
          vscode.postMessage({
            command: 'generateStructuredText',
            selectedPaths: selectedPaths
          });
        });
      </script>
    </body>
    </html>
  `;
}

function generateFileTreeHtml(node: FolderTree | FileTree, indent: string = ''): string {
  let html = '';

  if ('children' in node) {
    html += `
      <div>
        <label class="folder-label">
          <input type="checkbox" value="${node.path}" onchange="toggleCheckbox(this)">
          <span class="folder-icon">📁</span>
          <span class="folder-name" onclick="toggleFolder('${node.path}')">${node.name}</span>
        </label>
        <div class="folder-contents" data-folder-path="${node.path}">
          ${node.children.map(child => generateFileTreeHtml(child, indent + '  ')).join('')}
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

function filterProjectStructure(projectStructure: FolderTree, selectedPaths: string[]): FolderTree {
  const filteredStructure: FolderTree = {
    ...projectStructure,
    children: projectStructure.children
      .filter(child => selectedPaths.includes(child.path))
      .map(child => {
        if ('children' in child) {
          return filterProjectStructure(child, selectedPaths);
        } else {
          return child;
        }
      })
  };

  return filteredStructure;
}