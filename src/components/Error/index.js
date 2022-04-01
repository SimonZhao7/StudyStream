import React from 'react';
import { ErrorWrapper, ErrorIcon } from './Error.styles'

const Error = ({ error }) => {
    return (
        <ErrorWrapper>
            <ErrorIcon className="fa-regular fa-2xl fa-circle-xmark"></ErrorIcon>
            <p>{error.message}</p>
        </ErrorWrapper>
    )
}

export default Error