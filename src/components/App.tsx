import { Routes, Route } from 'react-router-dom';
import FolderView from './views/FolderView';
import FileView from './views/FileView';
import MainPageView from './views/MainPageView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPageView />} />
      <Route path="/drive/folder/" element={<FolderView />} />
      <Route path="/drive/folder/:folderId/" element={<FolderView />} />
      <Route path="/drive/file/:fileId/" element={<FileView />} />
    </Routes>
  );
}

export default App;