import * as fs from 'fs';
import * as path from 'path';

export async function saveToFile(content: string, projectPath: string): Promise<void> {
    const outputPath = fs.lstatSync(projectPath).isDirectory()
        ? path.join(projectPath, 'c2text_output.txt')
        : path.join(path.dirname(projectPath), 'c2text_output.txt');
    try {
        await fs.promises.writeFile(outputPath, content, 'utf-8');
    } catch (error) {
        console.error('Error saving structured text to file:', error);
        throw error;
    }
}