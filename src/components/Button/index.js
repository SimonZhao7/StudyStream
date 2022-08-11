import React from 'react'
// Styles
import { ButtonWrapper, ButtonContent } from './Button.styles'
// Components
import Spinner from '../Spinner'

const Button = ({ label, onClick, width, loading, color, hoverColor, isDisabled, unrounded, textColor, type, style }) => {
    return (
        <ButtonWrapper width={width}>
            <ButtonContent
                onClick={onClick}
                width={width}
                isDisabled={loading}
                disabled={loading || isDisabled}
                color={color}
                hoverColor={hoverColor}
                unrounded={unrounded}
                textColor={textColor}
                type={type}
                style={{ ...style }}
            >
                {loading ? <Spinner /> : label}
            </ButtonContent>
        </ButtonWrapper>
    )
}

export default Button
