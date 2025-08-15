"use client";
import React, { useState } from "react";

// This is a simplified login page with conditional rendering for different user roles.
// It uses mock data and does not connect to a real wallet or database.

const Card = ({ children }) => <div className='card'>{children}</div>;

const Button = ({ onClick, children, className = "", disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`button ${className}`}
  >
    {children}
  </button>
);

const ManagerLogin = ({ onLogin }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate a delay for connecting the wallet
    setTimeout(() => {
      console.log("Mock MetaMask connected.");
      const mockWalletAddress = "0x742d35Cc43a6F7B18E1256E3B8a77d5B72C76C29";
      onLogin("Manager", mockWalletAddress);
      setIsConnecting(false);
    }, 1500);
  };

  return (
    <div>
      <p className='text-center text-gray'>
        Connect your MetaMask wallet to log in as a Manager.
      </p>
      <Button onClick={handleConnect} disabled={isConnecting}>
        {isConnecting ? "Connecting..." : "Connect MetaMask Wallet"}
      </Button>
    </div>
  );
};

const StaffLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setErrorMessage(""); // Clear any previous errors
    // Simulate a delay for authentication
    setTimeout(() => {
      // Mock authentication logic
      if (username === "staff01" && password === "password") {
        console.log("Staff login successful.");
        onLogin("Staff", username);
      } else {
        setErrorMessage("Invalid username or password.");
      }
      setIsLoggingIn(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleLogin}>
      <p className='text-center text-gray'>Enter your Staff ID and password.</p>

      <div className='input-group'>
        <input
          type='text'
          placeholder='Staff ID'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='input'
          required
        />
      </div>

      <div className='input-group relative'>
        <input
          type={showPassword ? "text" : "password"}
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='input'
          required
        />
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className='show-hide-button'
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {errorMessage && (
        <p className='text-center error-message'>{errorMessage}</p>
      )}

      <Button type='submit' disabled={isLoggingIn}>
        {isLoggingIn ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default function LoginPage() {
  const [role, setRole] = useState("Manager");

  const handleLogin = (role, identifier) => {
    localStorage.setItem("role", role);
    console.log(`User logged in as ${role} with identifier: ${identifier}`);
    // A simple redirect to the home page after login.
    window.location.href = "/";
  };

  return (
    <div className='page-container'>
      <style>
        {`
          .page-container {
            min-height: 100vh;
            background-color: #f3f4f6;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .card {
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 1rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            max-width: 24rem;
            margin: 3rem auto;
            padding: 2rem;
            transition: all 0.3s ease;
          }
          .card:hover {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
          .title {
            margin-top: 0;
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            color: #111827;
          }
          .label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
            color: #374151;
          }
          .select {
            width: 100%;
            padding: 0.75rem;
            border-radius: 0.375rem;
            border: 1px solid #d1d5db;
            background-color: #ffffff;
            font-size: 0.875rem;
            outline: none;
            transition: all 0.2s ease;
          }
          .select:focus {
            ring-color: #6366f1;
            border-color: #6366f1;
            box-shadow: 0 0 0 2px #c7d2fe;
          }
          .button {
            width: 100%;
            margin-top: 1rem;
            padding: 0.75rem 1rem;
            border-radius: 9999px;
            background-image: linear-gradient(to right, #3b82f6, #4f46e5);
            color: #ffffff;
            font-size: 1rem;
            font-weight: 600;
            border: 2px solid transparent;
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .button:hover:not(:disabled) {
            background-image: linear-gradient(to right, #2563eb, #4338ca);
          }
          .button:active:not(:disabled) {
            transform: scale(0.95);
          }
          .button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          .text-center {
            text-align: center;
          }
          .text-gray {
            font-size: 0.875rem;
            color: #4b5563;
            margin-bottom: 1.5rem;
          }
          .input-group {
            margin-bottom: 1rem;
          }
          .input {
            width: 100%;
            padding: 0.75rem;
            border-radius: 0.375rem;
            border: 1px solid #d1d5db;
            font-size: 0.875rem;
            outline: none;
            transition: all 0.2s ease;
          }
          .input:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 2px #c7d2fe;
          }
          .relative {
            position: relative;
          }
          .show-hide-button {
            position: absolute;
            right: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            color: #6b7280;
            font-size: 0.75rem;
            font-weight: 600;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.25rem;
            transition: color 0.2s ease;
          }
          .show-hide-button:hover {
            color: #4b5563;
          }
          .error-message {
            color: #ef4444;
            font-size: 0.875rem;
            margin-bottom: 1rem;
          }
          .form-section {
            margin-top: 2rem;
          }
        `}
      </style>
      <Card>
        <h2 className='title'>Sign In</h2>
        <label className='label'>Select Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className='select'
        >
          <option>Manager</option>
          <option>Staff</option>
        </select>

        <div className='form-section'>
          {role === "Manager" ? (
            <ManagerLogin onLogin={handleLogin} />
          ) : (
            <StaffLogin onLogin={handleLogin} />
          )}
        </div>
      </Card>
    </div>
  );
}
