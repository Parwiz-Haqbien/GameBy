import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutation';
import Auth from '../utils/auth';
import './user.css'

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const userSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
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
    <div className="login-box">
      <h1>Login</h1>
      <form onSubmit={userSubmit} >

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
        id="pwd"
        onChange={handleChange}
        />
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <input type="button" value="Submit" />
      </form>
    </div>
    <p className="para-2">
      Not have an account? <Link to="/signup">Sign Up Here</Link>
    </p>
    </div>
  )
}

export default Login