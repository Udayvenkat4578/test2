import React, { useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
} from 'firebase/auth';
import { auth, provider } from '../firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem('isLoggedIn', 'true');
      const pendingConnectDonorId = sessionStorage.getItem('pendingConnectDonorId');
      if (pendingConnectDonorId) {
        navigate('/donors');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        const result = await signInWithPopup(auth, provider);
        sessionStorage.setItem('isLoggedIn', 'true');
        const pendingConnectDonorId = sessionStorage.getItem('pendingConnectDonorId');
        if (pendingConnectDonorId) {
          navigate('/donors');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          sessionStorage.setItem('isLoggedIn', 'true');
          const pendingConnectDonorId = sessionStorage.getItem('pendingConnectDonorId');
          if (pendingConnectDonorId) {
            navigate('/donors');
          } else {
            navigate('/');
          }
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div className="min-h-screen w-full grid md:grid-cols-2">
      <div className="relative hidden md:block">
        <img src="https://illustrations.popsy.co/blue/login.svg" alt="Login visual" className="h-full w-full object-cover" />
      </div>

      <div className="relative md:hidden">
        <img src="https://illustrations.popsy.co/blue/login.svg" alt="Login Background" className="absolute inset-0 h-full w-full object-cover opacity-30 z-0" />
        <div className="absolute inset-0 bg-black opacity-20 z-0" />
      </div>

      <div className="relative z-10 flex items-center justify-center px-4 py-12 md:p-16 bg-white bg-opacity-90 md:bg-white">
        <div className="bg-white p-6 md:p-10 rounded max-w-md w-full">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Login</h2>
          {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
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
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </form>
          <div className="my-4 text-center text-sm text-gray-600">OR</div>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100"
          >
            <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" />
            Login with Google
          </button>
          <p className="mt-4 text-center text-sm">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
