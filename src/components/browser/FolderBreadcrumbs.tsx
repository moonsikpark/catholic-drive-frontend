import React from 'react';
import { Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { DriveFolder } from '../../api/folder/types';
import { DriveFile } from '../../api/file/types';

interface BreadcrumbsProps {
    folderHierarchy: DriveFolder[];
    driveFile?: DriveFile;
}

const FolderBreadCrumbs: React.FC<BreadcrumbsProps> = ({ folderHierarchy, driveFile }) => {
    return (
        <Breadcrumbs sx={{ margin: 2 }} aria-label="breadcrumb" separator={< NavigateNextIcon fontSize="small" />}>
            {
                folderHierarchy.map((folder) => (
                    <Link
                        key={folder.id}
                        underline="hover"
                        color="inherit"
                        component={RouterLink}
                        to={`/drive/folder/${folder.id}/`}
                    >
                        {folder.name}
                    </Link>
                ))
            }
            {
                driveFile &&
                <Link
                    underline="hover"
                    color="inherit"
                    component={RouterLink}
                    to={`/drive/file/${driveFile.id}/`}
                >
                    {driveFile.name}
                </Link>
            }
        </Breadcrumbs >
    );
};

export default FolderBreadCrumbs;
