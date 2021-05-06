import React, {useEffect, useState} from 'react';
import {projectFirestore, timestamp} from '../config/firebase';
import {AiFillDelete} from 'react-icons/ai';
const Sidebar = ({setNoteId}) => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [notes, setNotes] = useState([]);
  const notesRef = projectFirestore.collection('notes');

  useEffect(() => {
    const unsub = projectFirestore
      .collection('notes')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({...doc.data(), id: doc.id});
        });
        setNotes(documents);
      });
    return () => unsub;
  }, []);

  const submitHandler = (e) => {
    console.log('SUBMIT');
    e.preventDefault();
    notesRef.add({title: currentTitle, body: '', createdAt: timestamp()});
    setCurrentTitle('');
  };

  const deleteNote = (id) => {
    projectFirestore.collection('notes').doc(id).delete();
    setNoteId('');
  };
  return (
    <div className='sidebar'>
      <div className='sidebar__add'>
        <p>Add New Note</p>
        <form onSubmit={submitHandler}>
          <input
            type='text'
            placeholder='Note Title'
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
          />
          <button disabled={!currentTitle} type='submit'>
            Create
          </button>
        </form>
      </div>
      <div className='sidebar__notes'>
        {notes?.map((note) => (
          <div className='notes__container' key={note.id}>
            <div
              className='notes__containerInner'
              onClick={() => {
                setNoteId(note?.id);
              }}
            >
              <p className='notes__title'>{note?.title}</p>
              {note?.body ? (
                <p className='notes__body'>{note.body}</p>
              ) : (
                <p className='notes__bodydefault'>Add note description</p>
              )}
            </div>
            <div className='notes__button'>
              <button type='button' onClick={() => deleteNote(note.id)}>
                <AiFillDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
