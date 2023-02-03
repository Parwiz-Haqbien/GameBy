import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutation';
import './signUp.css'

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
    <div className='main'>
        <input type={'checkbox'} id='chk' aria-hidden='true' />
            <div className='signup'>
                <form onSubmit={userSubmit}>
                    <label htmlFor='chk' aria-hidden='true'>SignUp</label>

                    <input 
                    type="userName" 
                    name="userName"
                    id='userName'
                    placeholder="User Name" 
                    onChange={handleChange}
                    required=""
                    />

                    <input 
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Email'
                    onChange={handleChange}
                    required=""
                    />

                    <input
                    type="password" 
                    name="password"
                    id='pwd'
                    onChange={handleChange}
                    placeholder="Password" 
                    required=""
                    />

                   <button type='submit'>Sign up</button>
                </form>
            </div>
            <Link to="/login">Login</Link>
    </div>
  )

}
export default SignUp