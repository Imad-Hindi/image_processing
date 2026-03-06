import fs from 'fs/promises';

async function fileExists(filePath: string): Promise<boolean> {
  try {
    // Check if the file exists and is visible to the process (F_OK)
    await fs.access(filePath, fs.constants.F_OK); 
    return true; // File exists
  } catch (error: any) {
    // If the error is not ENOENT (file not found), rethrow the error
    if (error.code !== 'ENOENT') {
      throw error;
    }
    return false; // File does not exist
  }
}

export default {
  fileExists
};