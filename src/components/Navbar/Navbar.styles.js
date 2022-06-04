import styled from 'styled-components';


export const NavWrapper = styled.header`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.transparent ? 'rgba(0, 0, 0, 0.8)' : 'var(--primary-color)'};
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
    background-color: ${props => props.transparent ? 'var(--primary-color)' : 'var(--secondary-color)'};
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
        background-color: ${props => props.transparent ? 'var(--primary-color-hover)' : 'var(--secondary-color-hover)'};
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