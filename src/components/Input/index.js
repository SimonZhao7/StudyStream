import React from 'react';
import { InputWrapper, InputBar, InputLabel } from './Input.styles';

const Input = ({ label, attrs, width }) => {
    return (
        <InputWrapper width={width}>
            <InputLabel>{label}</InputLabel>
            <InputBar {...attrs} />
        </InputWrapper>
    )
}

export default Input