import React from 'react'
import { ButtonWrapper, ButtonContent, ButtonSpinner } from './Button.styles'

const Button = ({ label, onClick, width, loading, color, hoverColor }) => {
    return (
        <ButtonWrapper width={width}>
            <ButtonContent
                onClick={onClick}
                width={width}
                disabled={loading}
                color={color}
                hoverColor={hoverColor}
            >
                {loading ? <ButtonSpinner></ButtonSpinner> : label}
            </ButtonContent>
        </ButtonWrapper>
    )
}

export default Button
