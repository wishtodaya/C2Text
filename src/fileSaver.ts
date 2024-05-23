import * as fs from 'fs';
import * as path from 'path';

export async function saveToFile(content: string, projectPath: string): Promise<void> {
  const outputPath = path.join(projectPath, 'c2text_output.txt');
  await fs.promises.writeFile(outputPath, content, 'utf-8');
}