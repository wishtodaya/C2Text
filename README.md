# C2Text - Code to Structured Text Generator / C2Text - 代码结构化文本生成器

C2Text is a Visual Studio Code extension that generates structured text representations of selected files and folders in your project. It provides an interactive user interface for selecting specific items to include in the generated output.

C2Text 是一个 Visual Studio Code 扩展，它可以生成项目中选定文件和文件夹的结构化文本表示。它提供了一个交互式用户界面，用于选择要包含在生成输出中的特定项目。

## Features / 特性

- Parses the selected file or folder and generates a structured text representation / 解析选定的文件或文件夹，并生成结构化文本表示
- Allows users to select specific files and folders to include in the output / 允许用户选择要包含在输出中的特定文件和文件夹
- Generates a tree structure showing the hierarchy of the selected items / 生成显示所选项目层次结构的树形结构
- Includes the content of the selected files in the output / 在输出中包含所选文件的内容
- Saves the generated structured text to a file named `c2text_output.txt` in the same directory as the selected file or folder / 将生成的结构化文本保存到与选定文件或文件夹相同目录下名为 `c2text_output.txt` 的文件中

## Usage / 使用方法

1. Right-click on a file or folder in the VS Code Explorer. / 在 VS Code 资源管理器中右键单击文件或文件夹。
2. Select "C2Text: Parse Selected" from the context menu. / 从上下文菜单中选择 "C2Text: Parse Selected"。
3. A webview will open, displaying the structure of the selected file or folder. / 将打开一个 webview，显示所选文件或文件夹的结构。
4. Select the checkboxes next to the files and folders you want to include in the output. / 选择要包含在输出中的文件和文件夹旁边的复选框。
5. Click the "Generate Structured Text" button. / 单击 "Generate Structured Text" 按钮。
6. The structured text will be generated and saved to `c2text_output.txt` in the same directory as the selected file or folder. / 结构化文本将生成并保存到与选定文件或文件夹相同目录下的 `c2text_output.txt` 文件中。
7. A notification will appear confirming that the structured text was generated successfully. / 将出现一个通知，确认结构化文本已成功生成。

## Requirements / 要求

- Visual Studio Code v1.60.0 or higher / Visual Studio Code v1.60.0 或更高版本

## Extension Settings / 扩展设置

This extension does not contribute any VS Code settings. / 此扩展不提供任何 VS Code 设置。

## Known Issues / 已知问题

None at the moment. Please report any issues you encounter on the [GitHub repository](https://github.com/yourusername/c2text). / 目前没有已知问题。如果您遇到任何问题，请在 [GitHub 仓库](https://github.com/yourusername/c2text) 上报告。

## Release Notes / 发行说明

### 1.0.0

- Initial release of C2Text extension / C2Text 扩展的初始版本

---

## Contributing / 贡献

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue on the [GitHub repository](https://github.com/yourusername/c2text). / 欢迎贡献！如果您有任何建议、错误报告或功能请求，请在 [GitHub 仓库](https://github.com/yourusername/c2text) 上打开一个 issue。

## License / 许可证

This extension is licensed under the [MIT License](LICENSE). / 本扩展采用 [MIT 许可证](LICENSE)。