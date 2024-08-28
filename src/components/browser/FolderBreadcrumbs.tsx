import React from 'react';
import { Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { File } from '../../api/types';

interface BreadcrumbsProps {
    folderHierarchy: File[];
}

const FolderBreadcrumbs: React.FC<BreadcrumbsProps> = ({ folderHierarchy }) => {
    return (
        <Breadcrumbs sx={{ margin: 2 }} aria-label="breadcrumb" separator={< NavigateNextIcon fontSize="small" />}>
            {
                folderHierarchy.map((folder) => (
                    <Link
                        key={folder.id}
                        underline="hover"
                        color="inherit"
                        component={RouterLink}
                        to={folder.path || 'root'}
                    >
                        {folder.name}
                    </Link>
                ))
            }
        </Breadcrumbs >
    );
};

export default FolderBreadcrumbs;
