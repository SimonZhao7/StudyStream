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
import AddPlaylistForm from '../../components/AddPlaylistForm'
import EditPlaylistModal from '../../components/EditPlaylistModal'
import ChangeStudySetTitleForm from '../../components/ChangeStudySetTitleForm'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchStudySet,
    openPlaylistModal,
    openEditTitleModal,
} from '../../redux/features/studySetSlice'
import { openEditModal } from '../../redux/features/spotifySlice'
import { showFlashcardForm } from '../../redux/features/studySetSlice'

const EditStudySet = () => {
    const { id } = useParams()
    const loading = useSelector((state) => state.studySet.loading)
    const editable = useSelector((state) => state.studySet.editable)
    const editingId = useSelector((state) => state.studySet.editingId)
    const editPlaylistModalOpen = useSelector(
        (state) => state.spotify.editPlaylistModalOpen
    )
    const flashcardFormOpen = useSelector(
        (state) => state.studySet.flashcardFormOpen
    )
    const addPlaylistModalOpen = useSelector(
        (state) => state.studySet.addPlaylistModalOpen
    )
    const editTitleModalOpen = useSelector(
        (state) => state.studySet.editTitleModalOpen
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
                                        <Button
                                            label='Change Title'
                                            onClick={() =>
                                                dispatch(openEditTitleModal())
                                            }
                                        />
                                        <Button
                                            label='Delete'
                                            color={'var(--error-color)'}
                                            hoverColor={
                                                'var(--error-color-hover)'
                                            }
                                        />
                                        {playlistId ? (
                                            <Button
                                                label='Edit Playlist'
                                                onClick={() =>
                                                    dispatch(openEditModal())
                                                }
                                            />
                                        ) : (
                                            <Button
                                                label='Add Playlist'
                                                onClick={() =>
                                                    dispatch(
                                                        openPlaylistModal()
                                                    )
                                                }
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
            {addPlaylistModalOpen && (
                <FlashcardEditModal>
                    <AddPlaylistForm />
                </FlashcardEditModal>
            )}
            {editPlaylistModalOpen && (
                <FlashcardEditModal>
                    <EditPlaylistModal />
                </FlashcardEditModal>
            )}
            {editTitleModalOpen && (
                <FlashcardEditModal>
                    <ChangeStudySetTitleForm />
                </FlashcardEditModal>
            )}
        </EditWrapper>
    )
}

export default EditStudySet
