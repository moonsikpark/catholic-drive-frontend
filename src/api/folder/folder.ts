import { api } from "../index";
import { DriveFolder, FolderResponse } from "./types";

export const createDriveFolder = async (folderData: Partial<DriveFolder>): Promise<DriveFolder> => {
    try {
        const response = await api.post<DriveFolder>("/drive/folder/", folderData);
        return response.data;
    } catch (error) {
        console.error("Error creating folder:", error);
        throw error;
    }
};

export const getRootFolder = async (): Promise<DriveFolder> => {
    try {
        const response = await api.get<FolderResponse>("/drive/folder/");
        return response.data.folder_hierarchy[0];
    } catch (error) {
        console.error("Error retrieving root folder:", error);
        throw error;
    }
};

export const getDriveFolder = async (folderId?: number): Promise<FolderResponse> => {
    const url = folderId ? `/drive/folder/${folderId}/` : "/drive/folder/";
    try {
        const response = await api.get<FolderResponse>(url);
        return response.data;
    } catch (error) {
        console.error("Error retrieving folder:", error);
        throw error;
    }
};


export const deleteDriveFolder = async (folderId: number): Promise<void> => {
    try {
        await api.delete(`/drive/folder/${folderId}/`);
    } catch (error) {
        console.error("Error deleting folder:", error);
        throw error;
    }
};