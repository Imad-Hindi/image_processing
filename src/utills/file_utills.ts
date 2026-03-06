import fs from 'fs/promises';

// Utility function to check if a file exists
async function fileExists(filePath: string): Promise<boolean> {
    try {
        // Check if the file exists and is visible to the process (F_OK)
        await fs.access(filePath, fs.constants.F_OK);
        return true; // File exists
    } catch (error: unknown) {
        // If the error is not ENOENT (file not found), rethrow the error
        if (
            error instanceof Error &&
            (error as NodeJS.ErrnoException).code !== 'ENOENT'
        ) {
            throw error;
        }
        return false; // File does not exist
    }
}

// Utility function to delete a file if it exists
async function deleteFileIfExists(filePath: string): Promise<void> {
    if (await fileExists(filePath)) {
        await fs.unlink(filePath);
    }
}

export default {
    fileExists,
    deleteFileIfExists,
};
