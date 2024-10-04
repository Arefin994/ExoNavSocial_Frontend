// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState(''); // Added bio state
  const [profilePicture, setProfilePicture] = useState(''); // Added profile picture state
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          bio, // Add bio to the payload
          profilePicture: profilePicture || 'https://randomuser.me/api/portraits/women/68.jpg', // Default profile picture if not provided
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/login'); // Navigate to login after successful registration
      } else {
        setError(data.message); // Display error message
      }
    } catch (err) {
      setError('Registration failed!'); // Handle network errors
    }
  };

  return (
    <Box className="text-center p-10">
      <h1 className="text-3xl font-bold">Register Page</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleRegister} className="flex flex-col items-center">
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mb-3"
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-3"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-3"
        />
        <TextField
          label="Bio"
          variant="outlined"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
          className="mb-3"
        />
        <TextField
          label="Profile Picture URL"
          variant="outlined"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
          className="mb-3"
        />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegisterPage;
