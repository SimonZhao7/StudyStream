import styled from 'styled-components'

export const ErrorWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    border-radius: 5px;
    border-left: var(--error-color) solid 5px;

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