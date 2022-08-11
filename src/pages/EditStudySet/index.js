import React, { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
// Styles
import {
    EditWrapper,
    StudySetInfo,
    TitleRow,
    StatsRow,
    StudySetWrapper,
    FlashcardsWrapper,
    LineBreak,
} from './EditStudySet.styles'
import MediaQuery from 'react-responsive'
// Components
import Button from '../../components/Button'
import FlashcardForm from '../../components/FlashcardForm'
import Flashcard from '../../components/Flashcard'
import FlashcardEditModal from '../../components/FlashcardEditModal'
import AddPlaylistForm from '../../components/AddPlaylistForm'
import EditPlaylistModal from '../../components/EditPlaylistModal'
import ChangeStudySetTitleForm from '../../components/ChangeStudySetTitleForm'
import StudySetEditRow from '../../components/StudySetEditRow'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchStudySet,
    showFlashcardForm,
} from '../../redux/features/studySetSlice'

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
    const { title, flashcards } = useSelector(
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

                                    <MediaQuery minWidth={577}>
                                        <StudySetEditRow />
                                    </MediaQuery>

                                    <MediaQuery maxWidth={576}>
                                        <StatsRow>
                                            <h4>
                                                Flashcards:{' '}
                                                {flashcards.length || 0}
                                            </h4>
                                        </StatsRow>
                                    </MediaQuery>
                                </TitleRow>

                                <MediaQuery minWidth={577}>
                                    <StatsRow>
                                        <h4>
                                            Flashcards: {flashcards.length || 0}
                                        </h4>
                                    </StatsRow>
                                </MediaQuery>

                                <MediaQuery maxWidth={576}>
                                    <br />
                                    <StudySetEditRow />
                                </MediaQuery>
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
                <FlashcardEditModal special={true}>
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
