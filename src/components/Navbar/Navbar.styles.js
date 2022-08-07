import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const NavWrapper = styled.header`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary-color);
    padding: 10px 15px;
    position: fixed;
    top: 0;
    z-index: 10;
`

export const NavLinks = styled.nav`
    display: flex;
    align-items: center;
    gap: 20px;
`

export const NavLink = styled(Link)`
    color: white;
    text-decoration: none;
`

export const ResponsiveNavLink = styled(NavLink)`
    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavLinkHeader = styled(NavLink)`
    font-size: 22px;
`

export const LinkButton = styled.button`
    background-color: var(--secondary-color);
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
    padding: 10px;
    height: 25px;
    cursor: pointer;

    display: flex;
    align-items: center;

    font-weight: 500;

    border: none;
    color: white;
    border-radius: 5px;

    transition: background-color 0.3s ease;

    :hover {
        background-color: var(--secondary-color-hover);
    }
`

export const UserImg = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    cursor: pointer;

    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const MenuIconWrapper = styled.div`
    @media screen and (min-width: 768px) {
        display: none;
    }
`

export const IconWrapper = styled.div`
    position: absolute;
    z-index: 9;
    top: 60px;
    right: -100px;
`

export const UserLinks = styled.div`
    position: absolute;
    z-index: 10;
    right: 10px;
    top: 70px;

    background-color: white;
    width: 150px;
    border-radius: 5px;

    a {
        display: block;
        text-align: center;
        padding: 5px;
        color: var(--dark-gray);
    }

    a:first-child {
        border-radius: 5px 5px 0 0;
    }

    a:last-child {
        border-radius: 0 0 5px 5px;
    }

    a:hover {
        background-color: #f5f5f5;
    }
`

export const MenuWrapper = styled.nav`
    position: absolute;
    top: 60px;
    right: 10px;

    width: 200px;
    padding: 15px;
    border-radius: 3px;
    background: var(--primary-color);
    box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.2);

    > a {
        display: block;
        margin-bottom: 5px;
    }

    > a:last-child {
        margin-bottom: 0;
    }
`