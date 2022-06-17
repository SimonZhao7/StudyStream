import React from 'react';
import { InputWrapper, InputBar, InputLabel } from './Input.styles';


const Input = ({ label, type, name, value, onChange, placeHolder, width, autoComplete }) => {
    return (
        <InputWrapper width={width}>
            <InputLabel>{label}</InputLabel>
            <InputBar type={type} value={value} name={name} onChange={onChange} placeholder={placeHolder} autoComplete={autoComplete} />
        </InputWrapper>
    )
}

export default Input