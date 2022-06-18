import styled from 'styled-components'

export const AlertWrapper = styled.div`
    width: 100%;
    border-radius: 5px;
    border-left: ${props => {
        switch (props.type) {
            case 'error':
                return 'var(--error-color) solid 5px'
            case 'success':
                return 'var(--success-color) solid 5px'
            default:
                return 'black solid 5px'
        }
    }};

    display: flex;
    gap: 10px;
    align-items: center;

    box-shadow: 1px 1px 3px lightgray;
    margin-bottom: 10px;
`

export const ErrorIcon = styled.i`
    color: var(--error-color);
    padding: 10px;
`

export const SuccessIcon = styled(ErrorIcon)`
    color: var(--success-color);
`