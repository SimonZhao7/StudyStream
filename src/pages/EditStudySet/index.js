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
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudySet } from '../../redux/features/studySetSlice'
import { showFlashcardForm } from '../../redux/features/studySetSlice'

const EditStudySet = () => {
    const { id } = useParams()
    const loading = useSelector((state) => state.studySet.loading)
    const editable = useSelector((state) => state.studySet.editable)
    const flashcardFormOpen = useSelector(
        (state) => state.studySet.flashcardFormOpen
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
                                    <ButtonsWrapper>
                                        <Button label='Change Title' />
                                        <Button
                                            label='Delete'
                                            color={'var(--error-color)'}
                                            hoverColor={
                                                'var(--error-color-hover)'
                                            }
                                        />
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
        </EditWrapper>
    )
}

export default EditStudySet
