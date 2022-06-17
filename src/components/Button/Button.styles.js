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
        return isDisabled ? (hoverColor || 'var(--primary-color-hover)') : (color || 'var(--primary-color)')
    }};
    transition: background-color 0.3s ease;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

    :hover {
        background-color: ${props => props.hoverColor || 'var(--primary-color-hover)'};
    }
`

export const ButtonSpinner = styled.div`
    height: 50%;
    aspect-ratio: 1 / 1;
    border: solid 3px white;
    border-top: solid 3px var(--primary-color-hover);
    border-radius: 50%;

    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
`