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
import MediaQuery from 'react-responsive'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { updateUser, resetFormSettings } from '../../redux/features/userSlice'
// Icons
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'
import { BsFillDiamondFill } from 'react-icons/bs'

const UserSettings = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [form, setForm] = useState('username')
    const [formData, setFormData] = useState({})
    const { _id } = useSelector((state) => state.user.value)
    const processing = useSelector((state) => state.user.processing)
    const errors = useSelector((state) => state.user.errors)
    const success = useSelector((state) => state.user.success)
    const dispatch = useDispatch()
    const menuRef = useRef()
    const formRef = useRef()
    const diamondRef = useRef()
    const fileRef = useRef()

    const positionMenu = () => {
        if (menuOpen) {
            const { left, top } = formRef.current.getBoundingClientRect()
            const leftOffset = window.innerWidth < 982 ? 60 : -170
            menuRef.current.style.left = `${left + leftOffset}px`
            menuRef.current.style.top = `${top}px`
            const { left: menuLeft, right } = menuRef.current.getBoundingClientRect()
            const diamondStyles = diamondRef.current.style
            diamondStyles.left = window.innerWidth < 982 ? `${menuLeft - 10}px` : `${right - 10}px`
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
        dispatch(resetFormSettings())
        setMenuOpen(false)
    }, [form, dispatch])

    const handleChange = (e) => {
        if (e.target.files) {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] })
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = new FormData()
        Object.keys(formData).forEach((key) => {
            body.append(key, formData[key])
        })
        dispatch(updateUser({ id: _id, body }))
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
                            <label>Choose a file</label>
                            <Button
                                label={
                                    formData.userImage
                                        ? formData.userImage.name
                                        : 'Choose'
                                }
                                onClick={() => fileRef.current.click()}
                                type='button'
                            />
                        </FileInput>
                    </>
                )}
                <Button label={'Confirm Change'} loading={processing} />
                <MediaQuery minWidth={982}>
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
                </MediaQuery>
                <MediaQuery maxWidth={981}>
                    {menuOpen ? (
                        <BiArrowToLeft
                            color='var(--dark-gray)'
                            size={30}
                            onClick={() => setMenuOpen(false)}
                        />
                    ) : (
                        <BiArrowToRight
                            color='var(--dark-gray)'
                            size={30}
                            onClick={() => setMenuOpen(true)}
                        />
                    )}
                </MediaQuery>
            </FormWrapper>
        </MainWrapper>
    )
}

export default UserSettings
