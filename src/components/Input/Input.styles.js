import styled from 'styled-components';


export const InputWrapper = styled.div`
    display: block;
    width: ${props => props.width || '100%'};
    margin-bottom: 15px;
`

export const InputLabel = styled.label`
    display: block;
    margin-bottom: 3px;
    padding-left: 2px;
`

export const InputBar = styled.input`
    width: 100%;
    height: 35px;
    padding: 10px;
    border-radius: 5px;
    border: 2px solid lightgray;   
    transition: border-color 0.3s ease;
    
    :hover {
        border: 2px solid black;
    }
`