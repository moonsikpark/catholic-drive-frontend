import React, { useState } from 'react';
import {
    Grid,
    List,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Snackbar,
    Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DriveFile } from '../../api/file/types';
import { DriveFolder } from '../../api/folder/types';
import { deleteDriveFile, downloadDriveFile } from '../../api/file/file';
import { deleteDriveFolder } from '../../api/folder/folder';
import FolderItem from './FolderItem';
import FileItem from './FileItem';

interface FolderExplorerProps {
    folders: DriveFolder[];
    files: DriveFile[];
    refreshData?: () => void;
}

const FolderExplorer: React.FC<FolderExplorerProps> = ({ folders, files, refreshData }) => {
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleFolderClick = (folderId: number) => {
        navigate(`/drive/folder/${folderId}`);
    };

    const handleFileClick = (fileId: number) => {
        navigate(`/drive/file/${fileId}`);
    };

    const handleDeleteFile = async (fileId: number) => {
        try {
            await deleteDriveFile(fileId);
            setSnackbarMessage('File deleted successfully');
            setSnackbarSeverity('success');
            refreshData?.();
        } catch (error) {
            setSnackbarMessage('Failed to delete file');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleDownloadFile = async (fileId: number) => {
        try {
            await downloadDriveFile(fileId);
            setSnackbarMessage('File downloaded successfully');
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage('Failed to download file');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleDeleteFolder = async (folderId: number) => {
        try {
            await deleteDriveFolder(folderId);
            setSnackbarMessage('Folder deleted successfully');
            setSnackbarSeverity('success');
            refreshData?.();
        } catch (error) {
            setSnackbarMessage('Failed to delete folder');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleRenameFolder = async (folderId: number) => {
        // Placeholder for rename logic; possibly open a dialog to rename folder
        // try {
        //     await renameDriveFolder(folderId, 'New Folder Name');
        //     setSnackbarMessage('Folder renamed successfully');
        //     setSnackbarSeverity('success');
        //     refreshData?.();
        // } catch (error) {
        //     setSnackbarMessage('Failed to rename folder');
        //     setSnackbarSeverity('error');
        // } finally {
        //     setSnackbarOpen(true);
        // }
    };

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <List>
                    {folders.map((folder) => (
                        <FolderItem
                            key={folder.id}
                            folder={folder}
                            onFolderClick={handleFolderClick}
                            onDeleteFolder={handleDeleteFolder}
                            onRenameFolder={handleRenameFolder}
                        />
                    ))}
                    {files.map((file) => (
                        <FileItem
                            key={file.id}
                            file={file}
                            onFileClick={handleFileClick}
                            onDeleteFile={handleDeleteFile}
                            onDownloadFile={handleDownloadFile}
                        />
                    ))}
                </List>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>
    );
};

export default FolderExplorer;