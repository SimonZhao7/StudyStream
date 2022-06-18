import React from 'react'
import { AlertWrapper, ErrorIcon, SuccessIcon } from './Alert.styles'

const Alert = ({ text, type }) => {
    return (
        <AlertWrapper type={type}>
            {type === 'error' && (
                <>
                    <ErrorIcon className='fa-regular fa-2xl fa-circle-xmark'></ErrorIcon>
                    <p>{text.message}</p>
                </>
            )}
            {type === 'success' && (
                <>
                    <SuccessIcon className="fa-solid fa-2xl fa-circle-check"></SuccessIcon>
                    <p>{text}</p>
                </>
            )}
        </AlertWrapper>
    )
}

export default Alert
