// src/api/index.ts
import axios from 'axios';
import { serializeFiles } from './serializers';
import { FetchFilesResponse } from './types';
import { File } from './types';

export const apiServer: string = 'http://localhost:9876';


export const api = axios.create({
    baseURL: `${apiServer}/api/v1`,
    withCredentials: true,
    withXSRFToken: true,                // This tells axios to send the CSRF token
    xsrfCookieName: 'csrftoken',       // This tells axios to look for the 'csrftoken' cookie
    xsrfHeaderName: 'X-CSRFToken',     // This tells axios to send the token in the 'X-CSRFToken' header
});

export const fetchUserInfo = async () => {
    try {
        const response = await api.get('/account/user/me/');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 403) {
            return null;
        }
        throw error;
    }
};

export const LogoutUser = async () => {
    window.location.href = `${apiServer}/admin/logout/?next=/`;
}

export const LoginUser = async () => {
    window.location.href = `${apiServer}/admin/login/?next=/`;
}

export const fetchFiles = async (id?: number): Promise<FetchFilesResponse> => {
    let url: string = '/drive/folder/';
    if (id) {
        url += `${id}/`;
    }
    const response = await api.get(url);
    return {
        objects: serializeFiles(response.data.objects),  // Serialize objects
        folderHierarchy: serializeFiles(response.data.folder_hierarchy),  // Serialize folder hierarchy
    };
};


export const fetchFileDetails = async (id: number): Promise<File> => {
    const response = await fetch(`/drive/file/${id}/`);
    if (!response.ok) {
        throw new Error('Failed to fetch file details');
    }
    const data = await response.json();
    return data as File;
};