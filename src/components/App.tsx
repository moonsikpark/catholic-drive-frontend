import React from 'react';
import NavBar from './NavBar';
import FolderExplorer from './browser/FolderExplorer';
import Container from '@mui/material/Container';

const App: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Container>
        <FolderExplorer />
      </Container>
    </div>
  );
};

export default App;