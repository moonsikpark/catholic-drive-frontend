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
import { Folder as FolderIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

interface FolderItemProps {
    folder: {
        id: number;
        name: string;
        created_at: string;
    };
    onFolderClick: (folderId: number) => void;
    onDeleteFolder: (folderId: number) => void;
    onRenameFolder: (folderId: number) => void; // Example additional action
}

const FolderItem: React.FC<FolderItemProps> = ({ folder, onFolderClick, onDeleteFolder, onRenameFolder }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        onDeleteFolder(folder.id);
        handleMenuClose();
    };

    const handleRename = () => {
        onRenameFolder(folder.id);
        handleMenuClose();
    };

    return (
        <ListItem button onClick={() => onFolderClick(folder.id)}>
            <ListItemIcon>
                <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={folder.name} secondary={new Date(folder.created_at).toLocaleDateString()} />
            <ListItemSecondaryAction>
                <IconButton edge="end" onClick={handleMenuOpen}>
                    <MoreVertIcon />
                </IconButton>
            </ListItemSecondaryAction>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleRename}>Rename Folder</MenuItem>
                <MenuItem onClick={handleDelete}>Delete Folder</MenuItem>
            </Menu>
        </ListItem>
    );
};

export default FolderItem;