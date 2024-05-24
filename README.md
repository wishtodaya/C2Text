# C2Text

[English](README_en.md) | [GitHub 仓库](https://github.com/wishtodaya/c2text.git)

C2Text 是一个 Visual Studio Code 扩展,旨在简化将项目结构化并完整提供给 AI 的过程。它可以生成项目中选定文件和文件夹的结构化文本表示,避免了手动复制粘贴的繁琐工作。

## 主要功能

- 生成选定文件和文件夹的结构化文本表示
- 允许用户选择要包含在输出中的特定项目
- 生成显示所选项目层次结构的树形结构
- 在输出中包含所选文件的内容
- 将生成的结构化文本保存到名为 `c2text_output.txt` 的文件中

## 使用方法

1. 在 VS Code 资源管理器中右键单击文件或文件夹
2. 从上下文菜单中选择 "C2Text: Parse Selected"
3. 选择要包含在输出中的项目
4. 单击 "Generate Structured Text"
5. 结构化文本将保存到 `c2text_output.txt` 文件中

## 安装要求

- Visual Studio Code v1.60.0 或更高版本

## 贡献

欢迎贡献!如果您有任何建议、错误报告或功能请求,请在 [GitHub 仓库](https://github.com/wishtodaya/c2text.git) 上提交 issue。

## 许可证

本扩展采用 [MIT 许可证](LICENSE)。