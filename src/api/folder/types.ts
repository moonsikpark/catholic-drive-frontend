import { DriveFile } from "../file/types";

export interface DriveFolder {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    path: string;
    parent: number | null;
}

export interface FolderResponse {
    folders: DriveFolder[];
    files: DriveFile[];
    folder_hierarchy: DriveFolder[];
}