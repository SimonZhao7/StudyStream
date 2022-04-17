import React from 'react'
import { ButtonWrapper, ButtonContent, ButtonSpinner } from './Button.styles'

const Button = ({ label, onClick, width, loading, color, hoverColor, isDisabled }) => {
    return (
        <ButtonWrapper width={width}>
            <ButtonContent
                onClick={onClick}
                width={width}
                isDisabled={loading}
                disabled={loading || isDisabled}
                color={color}
                hoverColor={hoverColor}
            >
                {loading ? <ButtonSpinner></ButtonSpinner> : label}
            </ButtonContent>
        </ButtonWrapper>
    )
}

export default Button
