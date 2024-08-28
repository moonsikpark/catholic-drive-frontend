export interface User {
    username: string;
}

export interface File {
    id: number;
    is_file: boolean;
    created_at: string;
    updated_at: string;
    name: string;

    path?: string;
}


export interface FetchFilesResponse {
    objects: File[];
    folderHierarchy: File[];
}