import React from 'react'
import { useNavigate } from 'react-router-dom'
// Styles
import { ButtonsWrapper } from './StudySetEditRow.styles'
// Components 
import Button from '../Button'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { openEditTitleModal, openPlaylistModal } from '../../redux/features/studySetSlice'
import { openEditModal } from '../../redux/features/spotifySlice'
import { deleteStudySet } from '../../redux/features/studySetsSlice'

const StudySetEditRow = () => {
    const {
        _id: studySetId,
        playlistId,
    } = useSelector((state) => state.studySet.studySet)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <ButtonsWrapper>
            <Button
                label='Change Title'
                onClick={() => dispatch(openEditTitleModal())}
            />
            <Button
                label='Delete'
                color={'var(--error-color)'}
                hoverColor={'var(--error-color-hover)'}
                onClick={() => {
                    dispatch(deleteStudySet(studySetId))
                    navigate('/my-studysets')
                }}
            />
            {playlistId ? (
                <Button
                    label='Edit Playlist'
                    onClick={() => dispatch(openEditModal())}
                />
            ) : (
                <Button
                    label='Add Playlist'
                    onClick={() => dispatch(openPlaylistModal())}
                />
            )}
        </ButtonsWrapper>
    )
}

export default StudySetEditRow
