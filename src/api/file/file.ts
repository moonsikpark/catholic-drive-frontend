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

export const getDriveFile = async (fileId: number): Promise<DriveFile> => {
    try {
        const response = await api.get<DriveFile>(`/drive/file/${fileId}/`);
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


export const downloadDriveFile = async (fileId: number): Promise<void> => {
    try {
        const response = await api.get(`/drive/file/${fileId}/download/`, {
            responseType: "blob",
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", response.headers["content-disposition"]);
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error("Error downloading file:", error);
        throw error;
    }
};