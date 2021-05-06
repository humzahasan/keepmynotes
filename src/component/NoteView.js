import React, {useEffect, useState} from 'react';
import {projectFirestore, timestamp} from '../config/firebase';
const NoteView = ({noteId}) => {
  // eslint-disable-next-line no-unused-vars
  const [note, setNote] = useState(null);
  const [notebody, setNoteBody] = useState('');
  const [notetitle, setNoteTitle] = useState('');

  useEffect(() => {
    if (noteId) {
      getDoc();
    }
    async function getDoc() {
      const snapshot = await projectFirestore
        .collection('notes')
        .doc(String(noteId))
        .get();
      const data = snapshot.data();
      setNote(data);
      setNoteTitle(data.title);
      setNoteBody(data.body);
    }
  }, [noteId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SUBMIT', notebody);
    projectFirestore.collection('notes').doc(String(noteId)).update({
      title: notetitle,
      body: notebody,
      createdAt: timestamp(),
    });
  };



  return (
    <div className='noteview'>
      {noteId && (
        <div>
          <form className='noteview__form'>
            <input
              placeholder='Note Title'
              type='text'
              value={notetitle}
              className='noteview__heading'
              required
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <textarea
              placeholder='Note Description'
              cols='30'
              rows='10'
              value={notebody}
              className='noteview__input'
              onChange={(e) => setNoteBody(e.target.value)}
            ></textarea>
            <button type='submit' onClick={handleSubmit}>
              Update Note
            </button>
            
          </form>
        </div>
      )}
    </div>
  );
};

export default NoteView;
