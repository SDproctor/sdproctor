import React from 'react'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>

        <img src={logo} alt='logo' id='logo1' />

        <nav>

            <Link to='/' className='link'>Home</Link>
            <Link to='/' className='link'>Why SD Proctor</Link>
            <Link to='/' className='link'>About</Link>
            <Link to='/register' className='link'>Register</Link>
            <Link to='/' className='link' id='contact'>Contact</Link>

        </nav>
    </header>
  )
}

export {Navbar}