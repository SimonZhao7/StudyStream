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
} from './EditStudySet.styles'
// Components
import Button from '../../components/Button'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudySet } from '../../redux/features/studySetSlice'

const EditStudySet = () => {
    const { id } = useParams()
    const loading = useSelector((state) => state.studySet.loading)
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
    }, [navigate, id, dispatch])

    return (
        <EditWrapper>
            {!loading && (
                <>
                    {!flashcards ? (
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
                                            hoverColor={'#d40000'}
                                        />
                                    </ButtonsWrapper>
                                </TitleRow>
                                <StatsRow>
                                    <h4>
                                        Flashcards: {flashcards.length || 0}
                                    </h4>
                                </StatsRow>
                                {flashcards.map((flashcard, key) => (
                                    <div></div>
                                ))}
                            </StudySetInfo>
                            <Button
                                label='Add Flashcard'
                                color={'var(--secondary-color)'}
                                hoverColor={'var(--secondary-color-hover)'}
                            />
                        </StudySetWrapper>
                    )}
                </>
            )}
        </EditWrapper>
    )
}

export default EditStudySet
