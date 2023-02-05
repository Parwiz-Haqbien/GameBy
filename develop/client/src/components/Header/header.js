import React from 'react';
import {FaUserAlt} from 'react-icons/fa'
import {HiInformationCircle} from 'react-icons/hi'
import {FiLogIn, FiUserPlus} from 'react-icons/fi'
import Auth from '../../utils/auth';
import Logo from "../Img/GameByLogo.png"
import './header.css'
import { Link } from 'react-router-dom'

function Header() {
    
    function showHeader() {
       if(Auth.loggedIn()) {
        return (
           <ul className='main-container'>

            <li className='display'>
                <Link to='/about'>
                <HiInformationCircle className='icons'/>
                </Link>
            </li>

              <li className='display'>
                <a href='/' onClick={() => Auth.logout()}>
                    <FiLogIn className='icons'/>
                </a>
              </li>
           </ul>
        );
    } else {
        return (
            <ul className='main-container'>
                <li className='display'>
                    
                    <Link to='/signup'>
                    <FiUserPlus className='icons'/>
                    </Link>
                    </li>

                <li className='display'>
                    <Link to='/login'>
                    <FaUserAlt className='icons'/>
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
            <img src={Logo} className='logo' alt="The Logo" /> 
            </Link>
        </h1>

        <nav>
        {showHeader()}
      </nav>
     </header>
  );
}

export default Header;