import React from 'react';
import UserStatus from './components/UserStatus';

const App: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Main Page</h1>
            <UserStatus />
        </div>
    );
};

export default App;