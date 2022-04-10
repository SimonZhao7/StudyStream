import React from 'react'
// Components
import Button from '../Button'
// Styles
import { StudySetWrapper, StudySetInfo, StudySetActions } from './StudySet.styles'
// Redux 
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const StudySet = ({ studySet }) => {
    const { _id: userId } = useSelector((state) => state.user.value)
    const { _id: studySetId, title, creator, flashcards } = studySet

    return (
        <StudySetWrapper>
            <StudySetInfo>
                <h1>{title}</h1>
                <h4>Flashcards: {flashcards.length}</h4>
            </StudySetInfo>
            {creator === userId && (
                <StudySetActions>
                    <Link to={`/edit/${studySetId}`}><Button label='Edit' /></Link>
                </StudySetActions>
            )}
        </StudySetWrapper>
    )
}

export default StudySet