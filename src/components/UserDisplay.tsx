import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { fetchUserInfo } from '../api';
import { LoginUser, LogoutUser } from '../api/index';
import { User } from '../api/types';

const UserDisplay: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      const userInfo = await fetchUserInfo();
      setUser(userInfo);
    };
    loadUserInfo();
  }, []);

  const handleLogout = async () => {
    LogoutUser();
  }

  const handleLogin = async () => {
    LoginUser();
  }

  return (
    <>
      {user ?
        <Typography variant="body1">{user.username}</Typography> : null
      }

      {user ? <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button> : <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>}

    </>
  );
};

export default UserDisplay;