import React from 'react';
import { InputWrapper, InputBar, InputLabel } from './Input.styles';


const Input = ({ label, type, value, onChange, placeHolder, width }) => {
    return (
        <InputWrapper width={width}>
            <InputLabel>{label}</InputLabel>
            <InputBar type={type} value={value} onChange={onChange} placeholder={placeHolder} />
        </InputWrapper>
    )
}

export default Input