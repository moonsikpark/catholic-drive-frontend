import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Snackbar,
    Alert,
} from '@mui/material';
import { DriveFolder } from '../../api/folder/types';
import { createDriveFolder } from '../../api/folder/folder';
import { uploadDriveFile } from '../../api/file/file';

interface NewObjectProps {
    currentFolder: DriveFolder;
    refreshData: () => void;
}

const NewObject: React.FC<NewObjectProps> = ({ currentFolder, refreshData }) => {
    const [isFolderDialogOpen, setFolderDialogOpen] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [isDragOver, setDragOver] = useState(false);

    const createNewFolder = (name: string) => {
        let path = currentFolder.path;
        if (path === '/') {
            path += name;
        } else {
            path += `/${name}`;
        }
        createDriveFolder({ parent: currentFolder.id, name: name, path: path })
            .then(() => {
                setSnackbarMessage('Folder created successfully');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                refreshData();
            })
            .catch(() => {
                setSnackbarMessage('Failed to create folder');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    };

    const handleFileUpload = (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', currentFolder.id.toString());
        formData.append('name', file.name);

        uploadDriveFile(formData)
            .then(() => {
                setSnackbarMessage('File uploaded successfully');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                refreshData();
            })
            .catch(() => {
                setSnackbarMessage('Failed to upload file');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(false);
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            handleFileUpload(event.target.files[0]);
        }
    };

    const openFolderDialog = () => {
        // setFolderDialogOpen(true);
    };

    const closeFolderDialog = () => {
        setFolderDialogOpen(false);
        setFolderName('');
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
            <Button
                variant="contained"
                // color={isDragOver ? 'primary' : 'default'}
                onClick={() => document.getElementById('fileInput')?.click()}
            >
                Upload File
            </Button>
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
            />
            <Button variant="contained" color="secondary" onClick={openFolderDialog}>
                Create Folder
            </Button>

            {/* Dialog for folder creation */}
            <Dialog open={isFolderDialogOpen} onClose={closeFolderDialog}>
                <DialogTitle>Create New Folder</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Folder Name"
                        type="text"
                        fullWidth
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeFolderDialog}>Cancel</Button>
                    <Button
                        onClick={() => {
                            createNewFolder(folderName);
                            closeFolderDialog();
                        }}
                        disabled={!folderName}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default NewObject;