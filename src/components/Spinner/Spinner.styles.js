import styled from 'styled-components'

export const Center = styled.div`
    display: flex;
    justify-content: center;
`

export const SpinnerWrapper = styled.div`
    height: ${props => props.height || '15px'};
    aspect-ratio: 1 / 1;
    border-style: solid; 
    border-width: ${props => props.width || '3px'};
    border-color: white;
    border-top-color: var(--secondary-color-hover);
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