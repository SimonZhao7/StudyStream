import React from 'react'
import { ButtonWrapper, ButtonContent } from './Button.styles'

const Button = ({ label, onClick, color, wrapperWidth, width }) => {
    return (
        <ButtonWrapper width={wrapperWidth}>
            <ButtonContent onClick={onClick} width={width}>{label}</ButtonContent>
        </ButtonWrapper>
    )
}

export default Button
