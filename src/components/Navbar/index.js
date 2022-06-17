import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
// Redux
import { useSelector } from 'react-redux'
// Styles
import {
    NavWrapper,
    NavLinks,
    LinkButton,
    UserImg,
    UserLinks,
    IconWrapper,
} from './Navbar.styles'
// Components
import SearchBar from '../SearchBar'
// Icons
import { BsFillDiamondFill } from 'react-icons/bs'

const Navbar = () => {
    const loading = useSelector((state) => state.user.loading)
    const signedIn = useSelector((state) => state.user.signedIn)
    const { userImage } = useSelector((state) => state.user.value)
    const [isUserLinksOpen, setIsUserLinksOpen] = useState(false)
    const userImg = useRef()
    const diamondRef = useRef()

    const repositionIcon = () => {
        if (isUserLinksOpen) {
            const { left, right } = userImg.current.getBoundingClientRect()
            diamondRef.current.style.left = `${
                (right - left) / 2 + left - 10
            }px`
        }
    }

    useEffect(() => {
        repositionIcon()
        window.addEventListener('resize', repositionIcon)
        return () => window.removeEventListener('resize', repositionIcon)
    })

    return (
        <>
            <NavWrapper>
                {!loading && (
                    <>
                        <NavLinks>
                            <Link to='/home'>Home</Link>
                            <Link to='/my-studysets'>Study Sets</Link>
                            <Link to='/create'>Create</Link>
                        </NavLinks>
                        {signedIn && <SearchBar />}
                        <NavLinks>
                            {/* If user is logged in show Logout and Profile Picture */}
                            {signedIn ? (
                                <>
                                    <Link to='/logout'>Logout</Link>
                                    <UserImg
                                        src={userImage}
                                        ref={userImg}
                                        alt='user img'
                                        onClick={() =>
                                            setIsUserLinksOpen(!isUserLinksOpen)
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <Link to='/login'>Login</Link>
                                    <Link to='/register'>
                                        <LinkButton>Register</LinkButton>
                                    </Link>
                                </>
                            )}
                        </NavLinks>
                    </>
                )}
            </NavWrapper>
            {isUserLinksOpen && (
                <>
                    <IconWrapper ref={diamondRef}>
                        <BsFillDiamondFill color='white' size={20} />
                    </IconWrapper>
                    <UserLinks>
                        <a href='/settings'>User Settings</a>
                        <a href='/'>Profile</a>
                    </UserLinks>
                </>
            )}
        </>
    )
}

export default Navbar
