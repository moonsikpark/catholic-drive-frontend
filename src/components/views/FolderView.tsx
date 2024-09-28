import React from 'react';
import NavBar from '../NavBar';
import FolderExplorer from '../browser/FolderExplorer';
import FolderBreadCrumbs from '../browser/FolderBreadCrumbs';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDriveFolder } from '../../api/folder/folder';
import { DriveFolder, FolderResponse } from '../../api/folder/types';
import { DriveFile } from '../../api/file/types';
import NewObject from '../browser/NewObject';

const FolderView: React.FC = () => {
    const { folderId } = useParams<{ folderId: string }>();
    const [folderHierarchy, setFolderHierarchy] = useState<DriveFolder[]>([]);
    const [folders, setFolders] = useState<DriveFolder[]>([]);
    const [files, setFiles] = useState<DriveFile[]>([]);

    const getDriveFolderData = (folderId: number) => {
        getDriveFolder(folderId).then((folderResponse: FolderResponse) => {
            setFolderHierarchy(folderResponse.folder_hierarchy);
            setFolders(folderResponse.folders);
            setFiles(folderResponse.files);
        });
    };

    const refreshData = () => {
        if (folderId) {
            getDriveFolderData(parseInt(folderId));
        }
    }

    useEffect(() => {
        if (folderId) {
            getDriveFolderData(parseInt(folderId))
        }
    }, [folderId]);

    return (
        <div>
            <NavBar />
            <Container>
                <FolderBreadCrumbs folderHierarchy={folderHierarchy} />
                <NewObject currentFolder={folderHierarchy[folderHierarchy.length - 1]} refreshData={refreshData} />
                <FolderExplorer folders={folders} files={files} refreshData={refreshData} />
            </Container>
        </div>
    );
};

export default FolderView;