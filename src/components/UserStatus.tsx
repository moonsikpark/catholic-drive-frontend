import React, { useState, useEffect } from 'react';

const UserStatus: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/account/user/me/', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.status === 200) {
                    setIsLoggedIn(true);
                } else if (response.status === 403) {
                    setIsLoggedIn(false);
                } else {
                    console.error('Unexpected response status:', response.status);
                }
            } catch (error) {
                console.error('Error checking login status:', error);
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    if (isLoggedIn === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {isLoggedIn ? (
                <p>User is logged in.</p>
            ) : (
                <p>User is not logged in.</p>
            )}
        </div>
    );
};

export default UserStatus;