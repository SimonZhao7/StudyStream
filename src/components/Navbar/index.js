import React from 'react';
import { Link } from 'react-router-dom';
import { NavWrapper, NavLinks, LinkButton } from './Navbar.styles'
import SearchBar from '../SearchBar';


const Navbar = () => {
    return (
        <NavWrapper>
            <NavLinks>
                <Link to='/' >Home</Link>
                <Link to='/' >Study Sets</Link>
                <Link to='/' >Create</Link>
            </NavLinks>
            <SearchBar />
            <NavLinks>
                {/* If user is logged in show Logout and Profile Picture */}
                <Link to='/' className='special'>Login</Link>
                <Link to='/register'><LinkButton>Register</LinkButton></Link>
            </NavLinks>
        </NavWrapper>
    )
}

export default Navbar