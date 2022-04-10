import React, { useEffect } from 'react'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudySets } from '../../redux/features/studySetsSlice'
// Components
import StudySet from '../../components/StudySet'
// Styles
import { ListWrapper } from './UserStudySets'
import { MainWrapper } from '../../globalStyles'

const UserStudySets = () => {
    const { _id: userId } = useSelector((state) => state.user.value)
    const loading = useSelector((state) => state.studySets.loading)
    const studySets = useSelector((state) => state.studySets.value)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStudySets(`user=${userId}`))
    }, [dispatch, userId])

    return (
        <MainWrapper style={{ alignItems: 'flex-start'}}>
            {!loading && (
                <ListWrapper>
                    {studySets.map((studySet, index) => (
                        <StudySet key={index} studySet={studySet} />
                    ))}
                </ListWrapper>
            )}
        </MainWrapper>
    )
}

export default UserStudySets
