import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudySets, goToPage } from '../../redux/features/studySetsSlice'
// Components
import StudySet from '../../components/StudySet'
import PaginateNav from '../../components/PaginateNav'
// Styles
import { ListWrapper, MessageWrapper } from './UserStudySets'
import { MainWrapper } from '../../globalStyles'
import Button from '../../components/Button'

const UserStudySets = () => {
    const { _id: userId } = useSelector((state) => state.user.value)
    const loading = useSelector((state) => state.studySets.loading)
    const studySets = useSelector((state) => state.studySets.value)
    const page = useSelector((state) => state.studySets.page)
    const maxPages = useSelector((state) => state.studySets.maxPages)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (userId) {
            dispatch(
                fetchStudySets(`?user=${userId}&page=${page}&sort=-createdAt`)
            )
        } else {
            navigate('/login')
        }
    }, [dispatch, userId, page, navigate])

    return (
        <MainWrapper>
            {!loading && (
                studySets.length > 0 ? (
                    <ListWrapper>
                        {studySets.map((studySet, index) => (
                            <StudySet key={index} studySet={studySet} />
                        ))}
                        <PaginateNav
                            page={page}
                            maxPages={maxPages}
                            pageChangeMethod={goToPage}
                        />
                    </ListWrapper>
                ) : (
                    <MessageWrapper>
                        <h1>You have not created any study sets!</h1>
                        <Button
                            label='Create Study Set'
                            color={'var(--secondary-color)'}
                            hoverColor={'var(--secondary-color-hover)'}
                            width='40%'
                            onClick={() => navigate('/create')}
                        />
                    </MessageWrapper>
                )
            )}
        </MainWrapper>
    )
}

export default UserStudySets
