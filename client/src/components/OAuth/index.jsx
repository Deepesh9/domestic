import React from 'react';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../features/auth/authSlice'; // Updated import path
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Include any necessary data for your sign-in process
        })
      });

      const data = await res.json();
      dispatch(signInSuccess(data)); // Dispatch action on successful sign-in
      navigate('/'); // Navigate to the home page or desired route
    } catch (error) {
      console.log("Could not perform sign-in", error);
    }
  };

  return (
    <div>
      {/* Uncomment the next line if you want to display a button for OAuth sign-in */}
      {/* <button onClick={handleSignIn}>Sign In with OAuth</button> */}
    </div>
  );
};

export default OAuth;
