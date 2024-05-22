import * as fs from 'fs';
import * as path from 'path';

export async function saveToFile(content: string, folderPath: string): Promise<void> {
    const outputPath = path.join(folderPath, 'project_structure.txt');
    await fs.promises.writeFile(outputPath, content, 'utf-8');
}