import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { fetchUserInfo } from '../api';
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

  return (
    <>
      {user ? (
        <Typography variant="body1">{user.username}</Typography>
      ) : (
        <Button color="inherit">Login</Button>
      )}
    </>
  );
};

export default UserDisplay;