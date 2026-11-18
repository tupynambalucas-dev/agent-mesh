import fs from 'fs';
import path from 'path';
import { config } from '../config.js';
import { ResumeMetadata } from '../types.js';

export class ResumeManager {
  private resumesDir: string;

  constructor(customDir?: string) {
    this.resumesDir = customDir || config.LINKEDIN_RESUMES_DIR;
    this.ensureDirectory();
  }

  public ensureDirectory(): void {
    if (!fs.existsSync(this.resumesDir)) {
      fs.mkdirSync(this.resumesDir, { recursive: true });
    }
  }

  public getDirectoryPath(): string {
    return this.resumesDir;
  }

  public listResumes(): ResumeMetadata[] {
    this.ensureDirectory();
    const files = fs.readdirSync(this.resumesDir);
    const resumes: ResumeMetadata[] = [];

    for (const file of files) {
      if (file === 'README.md' || file.startsWith('.')) continue;

      const fullPath = path.join(this.resumesDir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (!stat.isFile()) continue;

        const ext = path.extname(file).toLowerCase();
        let format: ResumeMetadata['format'] = 'unknown';
        let isText = false;

        if (ext === '.md') {
          format = 'markdown';
          isText = true;
        } else if (ext === '.txt') {
          format = 'text';
          isText = true;
        } else if (ext === '.pdf') {
          format = 'pdf';
        } else if (ext === '.docx' || ext === '.doc') {
          format = 'docx';
        }

        let previewExcerpt: string | undefined;
        if (isText) {
          try {
            const raw = fs.readFileSync(fullPath, 'utf8');
            previewExcerpt = raw.slice(0, 300).trim();
          } catch (e) {}
        }

        resumes.push({
          filename: file,
          path: fullPath,
          format,
          sizeBytes: stat.size,
          lastModified: stat.mtime.toISOString(),
          isText,
          previewExcerpt,
        });
      } catch (err) {
        // Skip unreadable files
      }
    }

    return resumes;
  }

  public getResume(filename: string): { filename: string; path: string; content?: string; isText: boolean; sizeBytes: number } {
    this.ensureDirectory();

    // Prevent path traversal
    const safeFilename = path.basename(filename);
    const targetPath = path.join(this.resumesDir, safeFilename);

    if (!fs.existsSync(targetPath)) {
      throw new Error(`Resume file '${safeFilename}' not found in resumes directory: ${this.resumesDir}`);
    }

    const stat = fs.statSync(targetPath);
    const ext = path.extname(safeFilename).toLowerCase();
    const isText = ext === '.md' || ext === '.txt';

    let content: string | undefined;
    if (isText) {
      content = fs.readFileSync(targetPath, 'utf8');
    }

    return {
      filename: safeFilename,
      path: targetPath,
      content,
      isText,
      sizeBytes: stat.size,
    };
  }
}

export const resumeManager = new ResumeManager();
