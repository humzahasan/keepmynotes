import {useState} from 'react';
import './App.css';
import NoteView from './component/NoteView';
import Sidebar from './component/Sidebar';
import Title from './component/Title';
import UserProvider from './provider/UserProvider';

function App() {
  const [noteId, setNoteId] = useState('');
  return (
    <UserProvider>
      <div className='app'>
        <Title />
        <div className='app__body'>
          <Sidebar setNoteId={setNoteId} />
          <NoteView noteId={noteId} />
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
