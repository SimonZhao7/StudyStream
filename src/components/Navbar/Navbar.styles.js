import styled from 'styled-components'

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
    a {
        color: white;
        text-decoration: none;
    }
    display: flex;
    align-items: center;
    gap: 20px;
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