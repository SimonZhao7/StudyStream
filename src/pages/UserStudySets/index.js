import React, { useEffect } from 'react'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudySets } from '../../redux/features/studySetsSlice'
// Components
import StudySet from '../../components/StudySet'
import PaginateNav from '../../components/PaginateNav'
// Styles
import { ListWrapper } from './UserStudySets'
import { MainWrapper } from '../../globalStyles'

const UserStudySets = () => {
    const { _id: userId } = useSelector((state) => state.user.value)
    const loading = useSelector((state) => state.studySets.loading)
    const studySets = useSelector((state) => state.studySets.value)
    const page = useSelector((state) => state.studySets.page)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStudySets(`?user=${userId}&page=${page}&sort=-createdAt`))
    }, [dispatch, userId, page])

    return (
        <MainWrapper style={{ alignItems: 'flex-start' }}>
            <ListWrapper>
                {!loading &&
                    studySets.map((studySet, index) => (
                        <StudySet key={index} studySet={studySet} />
                    )
                )}
                <PaginateNav />
            </ListWrapper>
        </MainWrapper>
    )
}

export default UserStudySets
