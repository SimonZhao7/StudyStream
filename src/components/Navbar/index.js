import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/features/userSlice';
// Styles
import { NavWrapper, NavLinks, LinkButton, UserImg } from './Navbar.styles';
// Components
import SearchBar from '../SearchBar';


const Navbar = () => {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.user.loading)
    const signedIn = useSelector(state => state.user.signedIn)
    const user = useSelector(state => state.user.value)

    useEffect(() => {
        const token = localStorage.getItem('jwt')
        if (token) {
            dispatch(login(token))
        }
    }, [dispatch])

    return (
        <NavWrapper>
            {!loading && 
            <>
            <NavLinks>
                <Link to='/' >Home</Link>
                <Link to='/' >Study Sets</Link>
                <Link to='/' >Create</Link>
            </NavLinks>
            <SearchBar />
            <NavLinks>
                {/* If user is logged in show Logout and Profile Picture */}
                {signedIn 
                ? 
                    <>
                    <Link to='/logout'>Logout</Link>
                    <UserImg src={user.userImage} alt='user img' />
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