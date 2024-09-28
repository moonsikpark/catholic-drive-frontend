import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import NavBar from '../NavBar';
import FileDetail from '../browser/FileDetail';
import { DriveFile } from '../../api/file/types';
import { getDriveFile } from '../../api/file/file';
import FolderBreadCrumbs from '../browser/FolderBreadCrumbs';
import { DriveFolder, FolderResponse } from '../../api/folder/types';
import { getDriveFolder } from '../../api/folder/folder';
import { Box } from '@mui/material';

const FileView: React.FC = () => {
    const [loadingDriveFile, setLoadingDriveFile] = useState<boolean>(true);
    const [loadingFolderHierarchy, setLoadingFolderHierarchy] = useState<boolean>(true);
    const { fileId } = useParams<{ fileId: string }>();
    const [driveFile, setDriveFile] = useState<DriveFile | null>(null);
    const location = useLocation();
    const [folderHierarchy, setFolderHierarchy] = useState<DriveFolder[]>([]);

    useEffect(() => {
        const loadDriveFile = async () => {
            setLoadingDriveFile(true);
            setLoadingFolderHierarchy(true);
            try {
                const driveFileData = await getDriveFile(Number(fileId ?? 0));
                setDriveFile(driveFileData);
            } catch (error) {
                console.error('Failed to load drive file:', error);
                setDriveFile(null); // Handle the error case
            } finally {
                setLoadingDriveFile(false);
            }
        };

        loadDriveFile();
    }, [fileId, location]);

    useEffect(() => {
        if (driveFile) {
            getDriveFolder(driveFile.folder).then((folderResponse: FolderResponse) => {
                setFolderHierarchy(folderResponse.folder_hierarchy);
                setLoadingFolderHierarchy(false);
            });
        }
    }, [driveFile]);

    if (loadingDriveFile || loadingFolderHierarchy) {
        return (
            <div>
                <NavBar />
                <Container>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh"
                    >
                        <CircularProgress />
                    </Box>
                </Container>
            </div>
        );
    }

    if (!driveFile) {
        return <div>File not found or an error occurred.</div>; // Fallback if file is null
    }

    return (
        <div>
            <NavBar />
            <Container>
                <FolderBreadCrumbs folderHierarchy={folderHierarchy} driveFile={driveFile} />
                <FileDetail driveFile={driveFile} />
            </Container>
        </div>
    );
};

export default FileView;