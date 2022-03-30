import styled from 'styled-components';


export const SearchForm = styled.form`
    display: flex;
    align-items: center;
`

export const IconContainer = styled.i`
    background-color: white;
    color: black;
    width: 300px;
    height: 20px;
    padding: 5px 0 5px 5px;
    border-radius: 5px;
    border: solid 2px lightgray;
    transition: border 0.3s ease;

    display: flex;
    align-items: center;
    gap: 5px;

    :hover {
        border: solid 2px black;
    }
`

export const SearchInput = styled.input`
    width: 100%;
    height: 20px;
    padding: 5px;
    border-radius: 5px;
    border: none;
`