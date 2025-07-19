import React, { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
} from 'firebase/auth';
import { auth, provider } from '../firebase/firebase';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/', { state: { userName: name || 'User' } });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        const result = await signInWithPopup(auth, provider);
        const displayName = result.user.displayName || 'User';
        navigate('/', { state: { userName: displayName } });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          const displayName = result.user.displayName || 'User';
          navigate('/', { state: { userName: displayName } });
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div className=" w-full grid md:grid-cols-2 min-h-screen">
      {/* Left side image for desktop */}
      <div className="relative hidden md:block">
        <img
          src="https://illustrations.popsy.co/blue/girl-with-email.svg"
          alt="Signup Illustration"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Mobile background image */}
      <div className="relative md:hidden">
        <img
          src="https://illustrations.popsy.co/blue/girl-with-email.svg"
          alt="Signup Mobile Background"
          className="absolute inset-0 h-full w-full object-cover opacity-30 z-0"
        />
        <div className="absolute inset-0 bg-black opacity-20 z-0" />
      </div>

      {/* Right side signup form */}
      <div className="relative z-10 flex items-center justify-center px-4 py-12 md:p-16 bg-white bg-opacity-90 md:bg-white">
        <div className="bg-white p-6 md:p-10 rounded  max-w-md w-full">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Sign Up</h2>
          {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Sign Up
            </button>
          </form>
          <div className="my-4 text-center text-sm text-gray-600">OR</div>
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100"
          >
            <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" />
            Sign up with Google
          </button>
          <p className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
