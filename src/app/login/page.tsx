"use client"; 
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import styles from './login.module.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState(''); // State for error messages
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev); // Toggle the password visibility
  };

  const goToSignup = () => {
    router.push('/signup'); // Navigate to the signup page
  };

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send the email and password
      });

      const data = await res.json();

      if (res.status === 200) {
        // Redirect to dashboard or home page on successful login
        router.push('/todohome');
      } else {
        setError(data.message); // Display the error message
      }
    } catch (error) {
      setError('An error occurred during login.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <Image 
          src="/images/login_image.png"  // Ensure the image path is correct
          alt="Login"
          width={650}
          height={650}
        />
      </div>
      <div className={styles.rightContainer}>
        <h2 className={styles.title}>LOG IN</h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <input 
              type="email" 
              id="email" 
              name="email"
              className={styles.input} 
              placeholder="Email" 
              value={email} // Bind email state
              onChange={(e) => setEmail(e.target.value)} // Update state on input
              required 
            />
          </div>
          <div className={styles.inputGroup}>
            <input 
              type={showPassword ? 'text' : 'password'} 
              id="password"
              name="password" 
              className={styles.input} 
              placeholder="Password" 
              value={password} // Bind password state
              onChange={(e) => setPassword(e.target.value)} // Update state on input
              required 
            />
            <span 
              className={styles.eyeIcon} 
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
            </span>
          </div>
          {error && <p className={styles.error}>{error}</p>} {/* Display error if exists */}
          <button type="submit" className={styles.button}>Log in</button>
          <h4 className={styles.noAcc}>
            Create an account?{' '}
            <u 
              className={styles.linkSignup} 
              onClick={goToSignup} // Attach the goToSignup function here
            >
              Sign up
            </u>
          </h4>
        </form>
      </div>
    </div>
  );
};

export default Login;
