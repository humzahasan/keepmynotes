import {useState} from 'react';
import './App.css';
import NoteView from './component/NoteView';
import Sidebar from './component/Sidebar';
import Title from './component/Title';

function App() {
  const [noteId, setNoteId] = useState('');
  return (
    <div className='app'>
      <Title />
      <div className='app__body'>
        <Sidebar setNoteId={setNoteId} />
        <NoteView noteId={noteId} />
      </div>
    </div>
  );
}

export default App;
