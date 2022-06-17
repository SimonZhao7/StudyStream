import React, { useState, useEffect, useRef } from 'react'
// Components
import Input from '../../components/Input'
import Button from '../../components/Button'
// Styles
import { MainWrapper } from '../../globalStyles'
import { FormWrapper, SettingsMenu, IconWrapper, FileInput } from './UserSettings.styles'
// Icons
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'
import { BsFillDiamondFill } from 'react-icons/bs'

const UserSettings = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [form, setForm] = useState('username')
    const menuRef = useRef()
    const formRef = useRef()
    const diamondRef = useRef()
    const fileRef = useRef()

    const positionMenu = () => {
        if (menuOpen) {
            const { left, top } = formRef.current.getBoundingClientRect()
            menuRef.current.style.left = `${left - 170}px`
            menuRef.current.style.top = `${top}px`
            const { right } = menuRef.current.getBoundingClientRect()
            const diamondStyles = diamondRef.current.style
            diamondStyles.left = `${right - 10}px`
            diamondStyles.top = `${top + 10}px`
        }
    }

    useEffect(() => {
        positionMenu()
        window.addEventListener('resize', positionMenu)
        return () => window.removeEventListener('resize', positionMenu)
    })

    return (
        <MainWrapper>
            {menuOpen && (
                <>
                    <IconWrapper ref={diamondRef}>
                        <BsFillDiamondFill color='white' size={20} />
                    </IconWrapper>
                    <SettingsMenu ref={menuRef}>
                        <Button
                            label={'Change Username'}
                            unrounded={true}
                            color='white'
                            textColor={'var(--dark-gray)'}
                            hoverColor='#ededed'
                            onClick={() => setForm('username')}
                        />
                        <Button
                            label={'Change Password'}
                            unrounded={true}
                            color='white'
                            textColor={'var(--dark-gray)'}
                            hoverColor='#ededed'
                            onClick={() => setForm('password')}
                        />
                        <Button
                            label={'Change Email'}
                            unrounded={true}
                            color='white'
                            textColor={'var(--dark-gray)'}
                            hoverColor='#ededed'
                            onClick={() => setForm('email')}
                        />
                        <Button
                            label={'Change Picture'}
                            unrounded={true}
                            color='white'
                            textColor={'var(--dark-gray)'}
                            hoverColor='#ededed'
                            onClick={() => setForm('picture')}
                        />
                    </SettingsMenu>
                </>
            )}
            <FormWrapper ref={formRef}>
                {form === 'username' && (
                    <>
                        <legend>Change Username</legend>
                        <Input
                            label={'New Username'}
                            type={'text'}
                            placeHolder={'Enter new username'}
                        />
                        <Input
                            label={'Password'}
                            type={'password'}
                            placeHolder={'Enter password'}
                        />
                    </>
                )}
                {form === 'password' && (
                    <>
                        <legend>Change Password</legend>
                        <Input
                            label={'Current Password'}
                            type={'password'}
                            placeHolder={'Enter password'}
                        />
                        <Input
                            label={'New Password'}
                            type={'password'}
                            placeHolder={'Enter new password'}
                        />
                        <Input
                            label={'Confirm Password'}
                            type={'password'}
                            placeHolder={'Confirm password'}
                        />
                    </>
                )}
                {form === 'email' && (
                    <>
                        <legend>Change Email</legend>
                        <Input
                            label={'Email'}
                            type={'email'}
                            placeHolder={'Enter email'}
                        />
                        <Input
                            label={'Password'}
                            type={'password'}
                            placeHolder={'Enter password'}
                        />
                    </>
                )}
                {form === 'picture' && (
                    <>
                        <legend>Change Profile Image</legend>
                        <input type={'file'} ref={fileRef} style={{ display: 'none' }} />
                        <FileInput>
                            <label>Choose a File</label>
                            <Button label={'Choose'} onClick={() => fileRef.current.click()} />
                        </FileInput>
                    </>
                )}
                <Button label={'Confirm Change'} />
                {menuOpen ? (
                    <BiArrowToRight
                        color='var(--dark-gray)'
                        size={30}
                        onClick={() => setMenuOpen(false)}
                    />
                ) : (
                    <BiArrowToLeft
                        color='var(--dark-gray)'
                        size={30}
                        onClick={() => setMenuOpen(true)}
                    />
                )}
            </FormWrapper>
        </MainWrapper>
    )
}

export default UserSettings
