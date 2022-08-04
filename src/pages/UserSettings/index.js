import React, { useState, useEffect, useRef } from 'react'
// Components
import Input from '../../components/Input'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
// Styles
import { MainWrapper } from '../../globalStyles'
import {
    FormWrapper,
    SettingsMenu,
    IconWrapper,
    FileInput,
} from './UserSettings.styles'
// Redux
import { useSelector } from 'react-redux'
// Icons
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'
import { BsFillDiamondFill } from 'react-icons/bs'
// API
import AXIOS from '../../api'

const UserSettings = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [form, setForm] = useState('username')
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState([])
    const [processing, setProcessing] = useState(false)
    const [success, setSuccess] = useState(false)
    const { _id } = useSelector((state) => state.user.value)
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

    useEffect(() => {
        setFormData({})
        setErrors([])
        setSuccess(false)
    }, [form])

    const handleChange = (e) => {
        if (e.target.files) {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] })
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)
        try {
            const token = localStorage.getItem('jwt')

            const response = await AXIOS.patch(`/users/${_id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.status === 200) {
                if (response.data.acknowledged) {
                    setErrors([])
                    setSuccess(true)
                } else {
                    setErrors([{ message: 'Fields may not be left empty' }])
                }
            }
        } catch (error) {
            setSuccess(false)
            setErrors(error.response.data)
        }
        setProcessing(false)
    }

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
            <FormWrapper
                ref={formRef}
                onSubmit={handleSubmit}
                encType='multipart/form-data'
            >
                {form === 'username' && (
                    <>
                        <legend>Change Username</legend>
                        {success && (
                            <Alert
                                text={'Successfully changed username'}
                                type='success'
                            />
                        )}
                        {errors.length > 0 && (
                            <Alert text={errors[0]} type='error' />
                        )}
                        <Input
                            label={'New Username'}
                            attrs={{
                                type: 'text',
                                placeHolder: 'Enter new username',
                                onChange: handleChange,
                                name: 'username',
                            }}
                        />
                        <Input
                            label={'Password'}
                            attrs={{
                                type: 'password',
                                placeHolder: 'Enter password',
                                onChange: handleChange,
                                name: 'password',
                            }}
                        />
                    </>
                )}
                {form === 'password' && (
                    <>
                        <legend>Change Password</legend>
                        {success && (
                            <Alert
                                text={'Successfully changed password'}
                                type='success'
                            />
                        )}
                        {errors.length > 0 && (
                            <Alert text={errors[0]} type='error' />
                        )}
                        <Input
                            label={'Current Password'}
                            attrs={{
                                type: 'password',
                                placeHolder: 'Enter password',
                                onChange: handleChange,
                                name: 'password',
                            }}
                        />
                        <Input
                            label={'New Password'}
                            attrs={{
                                type: 'password',
                                placeHolder: 'Enter new password',
                                onChange: handleChange,
                                name: 'newPassword',
                            }}
                        />
                        <Input
                            label={'Confirm Password'}
                            attrs={{
                                type: 'password',
                                placeHolder: 'Confirm password',
                                onChange: handleChange,
                                name: 'confirmPassword',
                            }}
                        />
                    </>
                )}
                {form === 'email' && (
                    <>
                        <legend>Change Email</legend>
                        {success && (
                            <Alert
                                text={'Successfully changed email'}
                                type='success'
                            />
                        )}
                        {errors.length > 0 && (
                            <Alert text={errors[0]} type='error' />
                        )}
                        <Input
                            label={'Email'}
                            attrs={{
                                type: 'email',
                                placeHolder: 'Enter email',
                                onChange: handleChange,
                                name: 'email',
                            }}
                        />
                        <Input
                            label={'Password'}
                            attrs={{
                                type: 'password',
                                placeHolder: 'Enter password',
                                onChange: handleChange,
                                name: 'password',
                            }}
                        />
                    </>
                )}
                {form === 'picture' && (
                    <>
                        <legend>Change Profile Image</legend>
                        {success && (
                            <Alert
                                text={'Successfully changed profile image'}
                                type='success'
                            />
                        )}
                        {errors.length > 0 && (
                            <Alert text={errors[0]} type='error' />
                        )}
                        <input
                            type={'file'}
                            ref={fileRef}
                            style={{ display: 'none' }}
                            name='userImage'
                            onChange={handleChange}
                        />
                        <FileInput>
                            <label>Choose a File</label>
                            <Button
                                label={'Choose'}
                                onClick={() => fileRef.current.click()}
                                type='button'
                            />
                        </FileInput>
                    </>
                )}
                <Button label={'Confirm Change'} loading={processing} />
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
