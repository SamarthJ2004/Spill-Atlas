import React,{useState} from 'react';
import '../styles/LoginPage.css';
import { initializeApp } from 'firebase/app';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBIGukGfETdBEm4F_eRVLo-L_CDCscDGe0",
  authDomain: "spill-atlas.firebaseapp.com",
  projectId: "spill-atlas",
  storageBucket: "spill-atlas.appspot.com",
  messagingSenderId: "969947831571",
  appId: "1:969947831571:web:578c22ad5844d327df8ee6",
  measurementId: "G-HRSZRLMCKY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginPage = () => {

  const [email,setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        // Redirect the user or perform further actions after successful login
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;