import React from 'react';
import { Link } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
// Styles
import { NavWrapper, NavLinks, LinkButton, UserImg } from './Navbar.styles';
// Components
import SearchBar from '../SearchBar';


const Navbar = () => {
    const loading = useSelector(state => state.user.loading)
    const signedIn = useSelector(state => state.user.signedIn)
    const { userImage } = useSelector(state => state.user.value)

    return (
        <NavWrapper>
            {!loading && 
            <>
            <NavLinks>
                <Link to='/' >Home</Link>
                <Link to='/my-studysets' >Study Sets</Link>
                <Link to='/create' >Create</Link>
            </NavLinks>
            <SearchBar />
            <NavLinks>
                {/* If user is logged in show Logout and Profile Picture */}
                {signedIn 
                ? 
                    <>
                    <Link to='/logout'>Logout</Link>
                    <UserImg src={userImage} alt='user img' />
                    </>
                :
                    <>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'><LinkButton>Register</LinkButton></Link>
                    </>
                }
            </NavLinks>
            </>
            }
        </NavWrapper>
    )
}

export default Navbar