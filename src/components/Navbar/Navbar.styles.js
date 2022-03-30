import styled from 'styled-components';


export const NavWrapper = styled.header`
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary-color);
    padding: 10px 15px;
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
        background-color: #11749e;
    }
`