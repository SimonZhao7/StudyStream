import styled from 'styled-components';


export const SearchForm = styled.form`
    display: flex;
    align-items: center;
`

export const IconContainer = styled.i`
    background-color: white;
    color: var(--dark-gray);
    width: 300px;
    height: 35px;
    padding: 5px 0 5px 5px;
    border-radius: 5px;
    border: solid 2px lightgray;
    transition: border 0.3s ease;

    display: flex;
    align-items: center;
    gap: 5px;

    :hover {
        border: solid 2px var(--dark-gray);
    }

    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const SearchInput = styled.input`
    width: 100%;
    height: 30px;
    padding: 5px;
    border-radius: 5px;
    border: none;
`

export const ResultWrapper = styled.div`
    background-color: white;
    border-radius: 5px;
    position: absolute;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    display: none;

    button, h2 {
        color: var(--dark-gray);
        text-align: center;
    }
`