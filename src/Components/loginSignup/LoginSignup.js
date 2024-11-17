import React, {useState, useEffect} from "react";
import { useNavigate  } from 'react-router-dom';
import { auth } from './../firebase/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import './LoginSignup.css';

function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const toggleMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setError('');   // this clears error on mode switch
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if(isSignup) {
        // Signup Mode
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Signed up: ', userCredential.user);
      } else {
        // Login Mode
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Logged in: ', userCredential.user);
      }
      navigate('/home');
    
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="login-signup">
      <form  className="input-field" onSubmit={handleSubmit}>
      <h2> BeatBox </h2>
        <div>
          <input 
            type='email'
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input 
            type='password'
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <span className="error-msg">
            {error && <p>{error}</p>}
          </span>
          
          <button className="submit-btn" type="submit">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </div>

      </form>

      <span className="togglebtn">
        <button onClick={toggleMode}>
          {isSignup ? 'Already have an account? Login' : 'Create an account? Sign Up'}
        </button>
      </span>

    </div>
  )
}

export default LoginSignup;
