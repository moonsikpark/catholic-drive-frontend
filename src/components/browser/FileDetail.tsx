import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { fetchFileDetails } from '../../api';
import { File } from '../../api/types';

const FileDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Assuming the route uses the file ID as a parameter
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadFileDetails = async () => {
            setLoading(true);
            try {
                const fileData = await fetchFileDetails(id);
                setFile(fileData);
            } catch (error) {
                console.error('Error fetching file details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadFileDetails();
        }
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!file) {
        return <Typography variant="h6">File not found</Typography>;
    }

    return (
        <Box p={2}>
            <Typography variant="h4">{file.name}</Typography>
            <Typography variant="body1">ID: {file.id}</Typography>
            <Typography variant="body1">Created At: {file.created_at}</Typography>
            <Typography variant="body1">Last Modified: {file.updated_at}</Typography>
            <Typography variant="body1">User ID: {file.user}</Typography>
            <Typography variant="body1">Folder ID: {file.folder}</Typography>
            <Box mt={2}>
                <Typography variant="h6">File Preview:</Typography>
                <img src={file.file} alt={file.name} style={{ maxWidth: '100%' }} />
            </Box>
        </Box>
    );
};

export default FileDetail;