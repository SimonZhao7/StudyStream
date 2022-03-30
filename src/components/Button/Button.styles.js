import styled from 'styled-components';

export const ButtonWrapper = styled.div`
    width: ${props => props.width || '100%'};
    text-align: center;
`

export const ButtonContent = styled.button`
    width: ${props => props.width || '100%'};
    height: 35px;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: ${props => props.color || 'var(--primary-color)'};
    transition: background-color 0.3s ease;

    :hover {
        background-color: var(--primary-color-hover);
    }
`