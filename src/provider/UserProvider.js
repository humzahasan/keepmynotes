import {useEffect, createContext, useState} from 'react';
import {projectAuth} from '../config/firebase';

export const userContext = createContext({user: null});

// eslint-disable-next-line import/no-anonymous-default-export
export default (prop) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    projectAuth.onAuthStateChanged((user) => {
      if (user) {
        setUser({displayName: user.displayName, email: user.email});
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <userContext.Provider value={user}>{prop.children}</userContext.Provider>
  );
};
