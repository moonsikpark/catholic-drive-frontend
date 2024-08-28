// src/api/serializers.ts
import { File } from './types';

export const serializeFiles = (data: any[]): File[] => {
    return data.map((item) => ({
        id: item.id,
        is_file: item.is_file,
        created_at: item.created_at,
        updated_at: item.updated_at,
        name: item.name,
        path: item.path,
    }));
};