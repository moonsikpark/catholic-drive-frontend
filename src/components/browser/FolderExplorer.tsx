import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchFiles } from '../../api';
import { File } from '../../api/types';
import FolderBreadCrumbs from './FolderBreadcrumbs';
import FolderObjects from './FolderObjects';

const FolderExplorer: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [folderHierarchy, setFolderHierarchy] = useState<File[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const loadFiles = async () => {
            const currentPath = location.pathname;
            const fileData = await fetchFiles(currentPath || "/");
            setFiles(fileData.objects);
            setFolderHierarchy(fileData.folderHierarchy);
        };
        loadFiles();
    }, [location.pathname]);

    const handleSort = (field: keyof File) => {
        const sortedFiles = [...files].sort((a, b) => {
            if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setFiles(sortedFiles);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, file: File) => {
        setAnchorEl(event.currentTarget);
        setSelectedFile(file);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRename = () => {
        console.log(`Renaming file: ${selectedFile?.name}`);
        // Implement renaming logic here
        handleMenuClose();
    };

    const handleDelete = () => {
        console.log(`Deleting file: ${selectedFile?.name}`);
        // Implement delete logic here
        handleMenuClose();
    };

    const handleFileClick = (file: File) => {
        if (!file.is_file) {
            navigate(file.path || '/');
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FolderBreadCrumbs folderHierarchy={folderHierarchy} />
            </Grid>
            <Grid item xs={12}>
                <FolderObjects
                    files={files}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                    onFileClick={handleFileClick}
                    onMenuOpen={handleMenuOpen}
                    anchorEl={anchorEl}
                    onMenuClose={handleMenuClose}
                    onRename={handleRename}
                    onDelete={handleDelete}
                />
            </Grid>
        </Grid>
    );
};

export default FolderExplorer;