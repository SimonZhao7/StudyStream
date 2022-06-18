import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Styles
import { FormWrapper } from './AddPlaylistForm.styles'
// Components
import Input from '../Input'
import Button from '../Button'
import Alert from '../Alert'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudySet, closeModals } from '../../redux/features/studySetSlice'
// API
import AXIOS from '../../api'

const AddPlaylistForm = () => {
    const [formData, setFormData] = useState({})
    const [processing, setProcessing] = useState(false)
    const [errors, setErrors] = useState()

    const { _id: studySetId } = useSelector((state) => state.studySet.studySet)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e) => {
        setProcessing(true)
        e.preventDefault()

        const spotifyData = JSON.parse(localStorage.getItem('spotify'))

        try {
            const token = localStorage.getItem('jwt')
            const response = await AXIOS.post(
                `/spotify/playlists`,
                { ...formData, spotifyData, studySetId }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (response.status === 201) {
                localStorage.setItem('spotify', JSON.stringify(response.data.spotifyData))
                dispatch(closeModals())
                dispatch(fetchStudySet(studySetId))
            }
        } catch (error) {
            const currentError = error.response

            if (currentError.status === 401) {
                // User hasn't connected to Spotify
                dispatch(closeModals())
                navigate('/connect')
            } else {
                setErrors(currentError.data)
            }
        }

        setTimeout(() => {
            setProcessing(false)
        }, 500)
        return () => clearTimeout()
    }

    return (
        <FormWrapper>
            <legend>Add Playlist</legend>
            {errors && <Alert text={errors[0]} type='error' />}
            <Input
                type='text'
                label='Playlist Name'
                name='name'
                onChange={handleChange}
            />
            <Button
                label='Add Playlist To Study Set'
                onClick={handleFormSubmit}
                loading={processing}
            />
        </FormWrapper>
    )
}

export default AddPlaylistForm
