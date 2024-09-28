import React, { useState } from 'react';
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
} from '@mui/material';
import { InsertDriveFile as FileIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

interface FileItemProps {
    file: {
        id: number;
        name: string;
        created_at: string;
    };
    onFileClick: (fileId: number) => void;
    onDeleteFile: (fileId: number) => void;
    onDownloadFile: (fileId: number) => void; // Example additional action
}

const FileItem: React.FC<FileItemProps> = ({ file, onFileClick, onDeleteFile, onDownloadFile }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        onDeleteFile(file.id);
        handleMenuClose();
    };

    const handleDownload = () => {
        onDownloadFile(file.id);
        handleMenuClose();
    };

    return (
        <ListItem button onClick={() => onFileClick(file.id)}>
            <ListItemIcon>
                <FileIcon />
            </ListItemIcon>
            <ListItemText primary={file.name} secondary={new Date(file.created_at).toLocaleDateString()} />
            <ListItemSecondaryAction>
                <IconButton edge="end" onClick={handleMenuOpen}>
                    <MoreVertIcon />
                </IconButton>
            </ListItemSecondaryAction>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleDownload}>Download File</MenuItem>
                <MenuItem onClick={handleDelete}>Delete File</MenuItem>
            </Menu>
        </ListItem>
    );
};

export default FileItem;