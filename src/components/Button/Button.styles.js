import styled from 'styled-components';

export const ButtonWrapper = styled.div`
    width: ${props => props.width || '100%'};
    text-align: center;
`

export const ButtonContent = styled.button`
    width: 100%;
    height: 35px;
    border: none;
    border-radius: ${props => props.unrounded ? 0 : '5px'};
    color: ${props => props.textColor ? props.textColor : 'white'};
    background-color: ${props => {
        const { isDisabled, hoverColor, color } = props
        return isDisabled ? (hoverColor || 'var(--secondary-color-hover)') : (color || 'var(--secondary-color)')
    }};
    transition: background-color 0.3s ease;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

    :hover {
        background-color: ${props => props.hoverColor || 'var(--secondary-color-hover)'};
    }
`