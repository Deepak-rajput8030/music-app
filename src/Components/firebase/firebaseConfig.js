import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDpzr3XfTL3P5yAypr98znbuDj4_RAM4X0",
  authDomain: "music-app-4e1c0.firebaseapp.com",
  projectId: "music-app-4e1c0",
  storageBucket: "music-app-4e1c0.appspot.com",
  messagingSenderId: "703265127044",
  appId: "1:703265127044:web:05d7863ee273d5b72fa0d1",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
