import React from 'react'
import { ButtonWrapper, ButtonContent, ButtonSpinner } from './Button.styles'

const Button = ({ label, onClick, wrapperWidth, width, loading }) => {
    return (
        <ButtonWrapper width={wrapperWidth}>
            <ButtonContent onClick={onClick} width={width} disabled={loading}>
                {loading 
                ? 
                    <ButtonSpinner></ButtonSpinner>
                : 
                    label
                }
            </ButtonContent>
        </ButtonWrapper>
    )
}

export default Button
