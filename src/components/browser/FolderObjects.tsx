import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, ListSubheader, IconButton, Menu, MenuItem, Box, Typography } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { File } from '../../api/types';

interface FileListProps {
    files: File[];
    sortOrder: 'asc' | 'desc';
    onSort: (field: keyof File) => void;
    onFileClick: (file: File) => void;
    onMenuOpen: (event: React.MouseEvent<HTMLElement>, file: File) => void;
    anchorEl: HTMLElement | null;
    onMenuClose: () => void;
    onRename: () => void;
    onDelete: () => void;
}

const FolderObjects: React.FC<FileListProps> = ({ files, sortOrder, onSort, onFileClick, onMenuOpen, anchorEl, onMenuClose, onRename, onDelete }) => {
    return (
        <>
            <List
                subheader={
                    <ListSubheader component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => onSort('name')}>
                                Name
                            </Typography>
                            <SortIcon fontSize="small" />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ cursor: 'pointer' }} onClick={() => onSort('updated_at')}>
                                Modified
                            </Typography>
                            <SortIcon fontSize="small" />
                        </Box>
                    </ListSubheader>
                }
            >
                {files.map((file) => (
                    <ListItem key={file.id} button onClick={() => onFileClick(file)}>
                        <ListItemIcon>
                            {!file.is_file ? <FolderIcon /> : <InsertDriveFileIcon />}
                        </ListItemIcon>
                        <ListItemText primary={file.name} secondary={`Last edited: ${file.updated_at}`} />
                        <IconButton edge="end" onClick={(e) => onMenuOpen(e, file)}>
                            <MoreVertIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={onMenuClose}
            >
                <MenuItem onClick={onRename}>Rename</MenuItem>
                <MenuItem onClick={onDelete}>Delete</MenuItem>
            </Menu>
        </>
    );
};

export default FolderObjects;
