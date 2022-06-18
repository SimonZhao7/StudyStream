import React, { useState } from 'react'
// Styles
import { FormWrapper } from './ChangeStudySetTitleForm.styles'
// Components
import Input from '../Input'
import Button from '../Button'
import Alert from '../Alert'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { changeTitle, closeModals } from '../../redux/features/studySetSlice'
// API
import AXIOS from '../../api'

const ChangeStudySetTitleForm = () => {
    const { _id: id } = useSelector((state) => state.studySet.studySet)
    const [title, setTitle] = useState('')
    const [errors, setErrors] = useState([])
    const [processing, setProcessing] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)
        try {
            const token = localStorage.getItem('jwt')
            const response = await AXIOS.patch(`/studysets/${id}`, {
                title,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.status === 200) {
                dispatch(changeTitle(title))
                dispatch(closeModals())
            }
        } catch (error) {
            setErrors(error.response.data)
        }

        setTimeout(() => {
            setProcessing(false)
        }, 500)
        return () => clearTimeout()
    }

    return (
        <FormWrapper>
            <legend>Change Playlist Title</legend>
            {errors.length > 0 && <Alert text={errors[0]} type='error' />}
            <Input
                label='Title'
                attrs={{
                    placeHolder: 'Enter a new title...',
                    name: 'title',
                    onChange: (e) => setTitle(e.target.value),
                }}
            />
            <Button label={'Change Study Set Name'} onClick={handleSubmit} loading={processing} />
        </FormWrapper>
    )
}

export default ChangeStudySetTitleForm
