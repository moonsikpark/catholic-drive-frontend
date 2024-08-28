import { api } from "../index";
import { DriveFile } from "./types";

export const uploadDriveFile = async (fileData: FormData): Promise<DriveFile> => {
    try {
        const response = await api.post<DriveFile>("/drive/file/", fileData);
        return response.data;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

export const getDriveFiles = async (): Promise<DriveFile[]> => {
    try {
        const response = await api.get<DriveFile[]>("/drive/file/");
        return response.data;
    } catch (error) {
        console.error("Error fetching files:", error);
        throw error;
    }
};

export const deleteDriveFile = async (fileId: number): Promise<void> => {
    try {
        await api.delete(`/drive/file/${fileId}/`);
    } catch (error) {
        console.error("Error deleting file:", error);
        throw error;
    }
};