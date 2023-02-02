import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom'

function Header() {
    
    function showHeader() {
       if(Auth.loggedIn()) {
        return (
           <ul className='main-container'>
              <li className='display'>
                <a href='/' onClick={() => Auth.logout()}>
                    Logout
                </a>
              </li>
           </ul>
        );
    } else {
        return (
            <ul className='main-container'>
                <li className='display'>
                    <Link to='/signup'>
                        SignUp
                    </Link>
                    </li>
                <li className='display'>
                    <Link to='/login'>
                        Login
                    </Link>
                </li>
            </ul>
        );
    }       
}
  return (
     <header className='main-container header'>
        <h1>
            <Link to='/'>
            <img src="GameBy-logo.png" alt="The Logo" /> 
            </Link>
        </h1>

        <nav>
        {showHeader()}
      </nav>
     </header>
  );
}

export default Header;