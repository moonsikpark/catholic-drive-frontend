// src/api/index.ts
import axios from 'axios';
import { serializeFiles } from './serializers';
import { FetchFilesResponse } from './types';
import { File } from './types';

const apiServer: string = 'http://localhost:8000';

export const api = axios.create({
    baseURL: `${apiServer}/api/v1`,
    withCredentials: true,
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


export const fetchFiles = async (id?: Number): Promise<FetchFilesResponse> => {
    try {
        let url: string = '/drive/folder/';
        if (id) {
            url += `${id}/`;
        }
        const response = await api.get(url);
        return {
            objects: serializeFiles(response.data.objects),  // Serialize objects
            folderHierarchy: serializeFiles(response.data.folder_hierarchy),  // Serialize folder hierarchy
        };
    } catch (error) {
        throw error;
    }
};


export const fetchFileDetails = async (id: Number): Promise<File> => {
  const response = await fetch(`/drive/file/${id}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch file details');
  }
  const data = await response.json();
  return data as File;
};