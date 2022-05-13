import React, { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
// Styles
import {
    EditWrapper,
    StudySetInfo,
    TitleRow,
    ButtonsWrapper,
    StatsRow,
    StudySetWrapper,
    FlashcardsWrapper,
    LineBreak,
} from './EditStudySet.styles'
// Components
import Button from '../../components/Button'
import FlashcardForm from '../../components/FlashcardForm'
import Flashcard from '../../components/Flashcard'
import FlashcardEditModal from '../../components/FlashcardEditModal'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudySet } from '../../redux/features/studySetSlice'
import { showFlashcardForm } from '../../redux/features/studySetSlice'
// API
import S_AXIOS from '../../api/spotifyApi'
// Helpers
import { refreshToken } from '../../helpers/spotify'

const EditStudySet = () => {
    const { id } = useParams()
    const loading = useSelector((state) => state.studySet.loading)
    const editable = useSelector((state) => state.studySet.editable)
    const editingId = useSelector((state) => state.studySet.editingId)
    const flashcardFormOpen = useSelector(
        (state) => state.studySet.flashcardFormOpen
    )
    const { title, flashcards, playlistId } = useSelector(
        (state) => state.studySet.studySet
    )
    const token = localStorage.getItem('jwt')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        dispatch(fetchStudySet(id))
    }, [navigate, id, dispatch, token])

    const handleAddPlaylist = () => {
        refreshToken()
        try {
            S_AXIOS.post(`/users/{}/playlists`, {})
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <EditWrapper>
            {!loading && (
                <>
                    {!flashcards || !editable ? (
                        <Navigate to='/404' />
                    ) : (
                        <StudySetWrapper>
                            <StudySetInfo>
                                <TitleRow>
                                    <h1>{title}</h1>
                                    <ButtonsWrapper>
                                        <Button label='Change Title' />
                                        <Button
                                            label='Delete'
                                            color={'var(--error-color)'}
                                            hoverColor={
                                                'var(--error-color-hover)'
                                            }
                                        />
                                        {playlistId ? (
                                            <Button label='Edit Playlist' />
                                        ) : (
                                            <Button
                                                label='Add Playlist'
                                                onClick={handleAddPlaylist}
                                            />
                                        )}
                                    </ButtonsWrapper>
                                </TitleRow>
                                <StatsRow>
                                    <h4>
                                        Flashcards: {flashcards.length || 0}
                                    </h4>
                                </StatsRow>
                            </StudySetInfo>
                            <LineBreak />
                            <FlashcardsWrapper>
                                {flashcards.map((flashcard, index) => (
                                    <Flashcard
                                        flashcard={flashcard}
                                        index={index + 1}
                                        key={index}
                                    />
                                ))}
                            </FlashcardsWrapper>
                            {!flashcardFormOpen ? (
                                <Button
                                    label='Add Flashcard'
                                    color={'var(--secondary-color)'}
                                    hoverColor={'var(--secondary-color-hover)'}
                                    onClick={() =>
                                        dispatch(showFlashcardForm())
                                    }
                                />
                            ) : (
                                <FlashcardForm />
                            )}
                        </StudySetWrapper>
                    )}
                </>
            )}
            {editingId && (
                <FlashcardEditModal>
                    <FlashcardForm />
                </FlashcardEditModal>
            )}
        </EditWrapper>
    )
}

export default EditStudySet
