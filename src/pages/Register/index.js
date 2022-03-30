import React from 'react';
import { RegisterWrapper, FormContent, RegisterForm } from './Register.styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Register = () => {
    return (
        <RegisterWrapper>
            <RegisterForm>
                <FormContent>
                    <legend>Register</legend>
                    <Input label='Email' type='email' placeHolder='Enter a unique email...' />
                    <Input label='Username' type='text' placeHolder='Pick an amazing username...' />
                    <Input label='Password' type='password' placeHolder='Include an unbreakable password...' />
                    <Input label='Confirm Password' type='password' placeHolder='Type it again...' />
                    <Button label='Done!' />
                </FormContent>
            </RegisterForm>
        </RegisterWrapper>
    )
}

export default Register