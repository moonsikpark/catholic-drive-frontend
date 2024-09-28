import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { fetchUserInfo } from '../../api';
import { getRootFolder } from '../../api/folder/folder';
import { User } from '../../api/types';
import { useNavigate } from "react-router-dom";

const MainPageView: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserInfo = async () => {
            const userInfo = await fetchUserInfo();
            setUser(userInfo);
        };
        loadUserInfo();
    }, []);

    useEffect(() => {
        const navigateToRoot = async () => {
            if (user) {
                // Redirect to the root folder view
                const rootFolder = await getRootFolder();
                navigate(`/drive/folder/${rootFolder.id}/`);
            }
        };
        navigateToRoot();
    }, [user, navigate]);

    return (
        <div>
            <NavBar />
            <Container>
                <Typography variant="h4">Welcome to Catholic Drive</Typography>
                <Typography variant="h4">Please log in</Typography>
            </Container>
        </div>
    );
};

export default MainPageView;