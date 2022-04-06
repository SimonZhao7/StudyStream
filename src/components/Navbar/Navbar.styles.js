import styled from 'styled-components';


export const NavWrapper = styled.header`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary-color);
    padding: 10px 15px;
    box-shadow: 1px 0 2px lightgray;
    position: fixed;
    top: 0;
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