import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutation';
import './signUp.css'
<link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
      rel="stylesheet"
    />

function SignUp(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const userSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        userName: formState.userName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <div className='container'>
    <div className='signup-box'>
         <h1>Sign Up</h1>
     <form onSubmit={userSubmit}>

        <label>userName</label>
        <input 
        type="text" 
        placeholder=""
        id="userName"
        onChange={handleChange}
         />

        <label>Email</label>
        <input 
        type="email" 
        placeholder="" 
        id="email"
        onChange={handleChange}
        />

        <label>Password</label>
        <input 
        type="password" 
        placeholder="" 
        id="password"
        onChange={handleChange}
        />
        <input type="button" value="Submit" />
      </form>
      </div>
    <p className="para-2">
      Already have an account? <Link to="/login">Login here</Link>
    </p>
    </div>
  )

}
export default SignUp