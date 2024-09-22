"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import styles from "./signup.module.css";

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const [error, setError] = useState<string | null>(null); // State for error handling
  const router = useRouter(); // Initialize useRouter

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the password visibility
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev); // Toggle the confirm password visibility
  };

  const goToLogin = () => {
    router.push('/login'); // Navigate to the login page
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // Client-side validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`api/register`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        }),
      });

      if (response.status === 201) {
        router.push('/login');
      } else {
        const data = await response.json();
        setError(data.message || "Signup failed");
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        setError("An error occurred during signup. Please try again.");
      } else {
        console.error("An unknown error occurred");
        setError("An unknown error occurred. Please try again.");
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <h1 className={styles.app}>TODO APP</h1>
        <h2 className={styles.title}>SIGN UP</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              id="email"
              className={styles.input}
              placeholder="Email"
              required
            />
            <input
              type="text"
              id="name"
              name="name"
              className={styles.input}
              placeholder="Name"
              required
            />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className={styles.input}
              placeholder="Password"
              required
              minLength={6} // Optional: Add minLength for validation
            />
            <span className={styles.eyeIconL} onClick={togglePasswordVisibility}>
              {showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
            </span>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              className={styles.input}
              placeholder="Confirm Password"
              required
              minLength={6} // Optional: Add minLength for validation
            />
            <span className={styles.eyeIconF} onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <IoEyeSharp /> : <FaEyeSlash />}
            </span>
          </div>
          {error && <p className={styles.error}>{error}</p>} {/* Display error message */}
          <button type="submit" className={styles.button}>
            Sign up
          </button>
          <h4 className={styles.alreadyAcc}>
            Already have an account?{' '}
            <u
              className={styles.linkLogIn}
              onClick={goToLogin}
            >
              Log in
            </u>
          </h4>
        </form>
      </div>
      <div className={styles.rightContainer}>
        <Image
          src="/images/signup_image.png"
          alt="Signup"
          width={720}
          height={650}
        />
      </div>
    </div>
  );
};

export default Signup;
