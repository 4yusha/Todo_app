"use client"; 
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import styles from './login.module.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev); 
  };

  const goToSignup = () => {
    router.push('/signup');
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
        body: JSON.stringify({ email, password }), 
      });

      const data = await res.json();

      if (res.status === 200) {
        
        router.push('/todohome');
      } else {
        setError(data.message); 
      }
    } catch (error) {
      setError('An error occurred during login.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <Image 
          src="/images/login_image.png"  
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
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
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
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <span 
              className={styles.eyeIcon} 
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
            </span>
          </div>
          {error && <p className={styles.error}>{error}</p>} 
          <button type="submit" className={styles.button}>Log in</button>
          <h4 className={styles.noAcc}>
            Create an account?{' '}
            <u 
              className={styles.linkSignup} 
              onClick={goToSignup} 
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
