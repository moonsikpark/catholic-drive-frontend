import React from 'react';
import { Box, Typography } from '@mui/material';
import { DriveFile } from '../../api/file/types';

interface FileDetailProps {
    driveFile: DriveFile | null;
}

const FileDetail: React.FC<FileDetailProps> = ({ driveFile }) => {

    if (!driveFile) {
        return <Typography variant="h6">File not found</Typography>;
    }

    return (
        <Box p={2}>
            <Typography variant="h4">{driveFile.name}</Typography>
            <Typography variant="body1">ID: {driveFile.id}</Typography>
            <Typography variant="body1">Created At: {new Date(driveFile.created_at).toLocaleString()}</Typography>
            <Typography variant="body1">Last Modified: {new Date(driveFile.updated_at).toLocaleString()}</Typography>
            <Typography variant="body1">Folder ID: {driveFile.folder}</Typography>
        </Box>
    );
};

export default FileDetail;