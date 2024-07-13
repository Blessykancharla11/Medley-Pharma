import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        email,
        password
      };
      const response = await axios.post('http://localhost:8000/api/users/register', newUser);
      console.log('User is created', response.data);
      setMessage('User created successfully');
    } catch (error) {
      console.log(error);
      setMessage('Error creating user');
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

export default CreateUser;
