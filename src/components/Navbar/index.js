import React, { useState, useRef, useEffect } from 'react'
// Redux
import { useSelector } from 'react-redux'
// Styles
import {
    NavWrapper,
    NavLinks,
    ResponsiveNavLink,
    NavLink,
    NavLinkHeader,
    LinkButton,
    UserImg,
    UserLinks,
    IconWrapper,
    MenuIconWrapper,
    MenuWrapper,
    MenuImgWrapper,
    MenuImg,
} from './Navbar.styles'
// Components
import SearchBar from '../SearchBar'
// Icons
import { BsFillDiamondFill } from 'react-icons/bs'
import { AiOutlineMenu } from 'react-icons/ai'

const Navbar = () => {
    const loading = useSelector((state) => state.user.loading)
    const signedIn = useSelector((state) => state.user.signedIn)
    const { userImage } = useSelector((state) => state.user.value)
    const [isUserLinksOpen, setIsUserLinksOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const userLinks = useRef()
    const userImg = useRef()
    const menuRef = useRef()
    const menuIcon = useRef()
    const diamondRef = useRef()

    const repositionIcon = () => {
        if (isUserLinksOpen && userImg.current) {
            const { left, right } = userImg.current.getBoundingClientRect()
            diamondRef.current.style.left = `${
                (right - left) / 2 + left - 10
            }px`
        }

        if (menuOpen && window.innerWidth > 768) {
            setMenuOpen(false)
        }

        if (window.innerWidth <= 768) {
            setIsUserLinksOpen(false)
        }
    }

    const handleWindowClick = (e) => {
        if (
            userLinks.current &&
            !userLinks.current.contains(e.target) &&
            e.target !== userImg.current
        ) {
            setIsUserLinksOpen(false)
        }

        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setMenuOpen(false)
        }
    }

    useEffect(() => {
        repositionIcon()
        window.addEventListener('click', handleWindowClick, { capture: true })
        window.addEventListener('resize', repositionIcon)
        return () => { 
            window.removeEventListener('resize', repositionIcon)
            window.removeEventListener('click', handleWindowClick, { capture: true })
        }
    })

    return (
        <>
            <NavWrapper>
                {!loading && (
                    <>
                        <NavLinks>
                            <NavLinkHeader to='/home'>Home</NavLinkHeader>
                            <ResponsiveNavLink to='/my-studysets'>
                                Study Sets
                            </ResponsiveNavLink>
                            <ResponsiveNavLink to='/create'>
                                Create
                            </ResponsiveNavLink>
                        </NavLinks>
                        {signedIn && <SearchBar />}
                        <NavLinks>
                            {/* If user is logged in show Logout and Profile Picture */}
                            {signedIn ? (
                                <>
                                    <ResponsiveNavLink to='/logout'>
                                        Logout
                                    </ResponsiveNavLink>
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
                                    <ResponsiveNavLink to='/login'>
                                        Login
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink to='/register'>
                                        <LinkButton>Register</LinkButton>
                                    </ResponsiveNavLink>
                                </>
                            )}
                            <MenuIconWrapper ref={menuIcon}>
                                <AiOutlineMenu
                                    size={25}
                                    onClick={() => setMenuOpen(!menuOpen)}
                                />
                            </MenuIconWrapper>
                        </NavLinks>
                    </>
                )}
                {isUserLinksOpen && (
                    <>
                        <IconWrapper ref={diamondRef}>
                            <BsFillDiamondFill color='white' size={20} />
                        </IconWrapper>
                        <UserLinks ref={userLinks}>
                            <a href='/settings'>User Settings</a>
                            <a href='/settings'>Profile</a>
                        </UserLinks>
                    </>
                )}
                {menuOpen && (
                    <MenuWrapper ref={menuRef}>
                        <NavLink to='/my-studysets'>Study Sets</NavLink>
                        <NavLink to='/create'>Create</NavLink>
                        {signedIn ? (
                            <>
                                <NavLink to='/logout'>Logout</NavLink>
                                <NavLink to='/settings'>User Settings</NavLink>
                                <SearchBar overrideResponsive={true} />
                                <MenuImgWrapper>
                                    <MenuImg src={userImage} alt='user img' />
                                </MenuImgWrapper>
                            </>
                        ) : (
                            <>
                                <NavLink to='/login'>Login</NavLink>
                                <NavLink to='/register'>Register</NavLink>
                            </>
                        )}
                    </MenuWrapper>
                )}
            </NavWrapper>
        </>
    )
}

export default Navbar
