import React, {useContext, useEffect, useState} from 'react';
import {
  googleprovider,
  projectAuth,
  projectFirestore,
  timestamp,
} from '../config/firebase';
import {AiFillDelete} from 'react-icons/ai';
import { FcGoogle } from "react-icons/fc";
import {FiLogOut} from 'react-icons/fi';
import {userContext} from '../provider/UserProvider';
const Sidebar = ({setNoteId}) => {
  const user = useContext(userContext);
  const [currentTitle, setCurrentTitle] = useState('');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const notesRef = projectFirestore.collection('notes');

  //console.log(user?.email);

  useEffect(() => {
    const getNotes = () => {
      projectFirestore
        .collection('notes')
        .where('createdBy', '==', user.email)
        .onSnapshot((snap) => {
          let documents = [];
          snap.forEach((doc) => {
            documents.push({...doc.data(), id: doc.id});
          });
          setNotes(documents);
        });
    };

    if (user) {
      setLoading(false);
      if (!loading) {
        getNotes();
      }
    }
  }, [loading, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    notesRef.add({
      title: currentTitle,
      body: '',
      createdBy: user.email,
      createdAt: timestamp(),
    });
    setCurrentTitle('');
  };

  const deleteNote = (id) => {
    projectFirestore.collection('notes').doc(id).delete();
    setNoteId('');
  };

  const handleLogin = () => {
    projectAuth
      .signInWithPopup(googleprovider)
      .then((res) => console.log(res.user))
      .catch((err) => console.log(err));
  };

  const handleSignOut = () => {
    setNotes(null);
    projectAuth.signOut();
    setNoteId('');
    setLoading(false);
  };

  return (
    <>
      {user ? (
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
            <button type='submit' className='btn-auth' onClick={handleSignOut}>
              Sign Out&nbsp;<FiLogOut size='1.5em' />
            </button>
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
                    <p className='notes__body'>{note.body.slice(0, 60)}</p>
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
      ) : (
        <div className='sidebar__login'>
          <h3>Please login to access your saved note</h3>
          <button className='btn-auth' type='submit' onClick={handleLogin}>
            Login with &nbsp;<FcGoogle size='2em' />
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
