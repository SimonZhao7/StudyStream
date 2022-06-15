import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// Styles
import { BaseWrapper } from '../../globalStyles'
import { StudySetsWrapper, HomeContent } from './Home.styles'
// Components
import StudySet from '../../components/StudySet'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/features/userSlice'

const Home = () => {
    const { username, recentlyViewedSets } = useSelector(
        (state) => state.user.value
    )
    const loading = useSelector((state) => state.user.loading)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem('jwt')

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        dispatch(login(token))
    }, [dispatch, token, navigate])

    return (
        <BaseWrapper>
            {!loading && (
                <HomeContent>
                    <h1>Hello {username}!</h1>
                    <div style={{ marginBottom: '50px' }}>
                        {recentlyViewedSets && recentlyViewedSets.length > 0 ? (
                            <>
                                <p>
                                    Here are your most recently viewed study
                                    sets!
                                </p>
                                <StudySetsWrapper>
                                    {[...recentlyViewedSets]
                                        .reverse()
                                        .map((studySet, index) => (
                                            <StudySet
                                                studySet={studySet}
                                                key={index}
                                            />
                                        ))}
                                    {recentlyViewedSets.length % 3 !== 0 &&
                                    (recentlyViewedSets.length + 1) % 3 ===
                                        0 ? (
                                        <div></div>
                                    ) : (
                                        <>
                                            <div></div>
                                            <div></div>
                                        </>
                                    )}
                                </StudySetsWrapper>
                            </>
                        ) : (
                            <p>
                                You have no previously viewed study sets. Get
                                studying!!!
                            </p>
                        )}
                    </div>
                </HomeContent>
            )}
        </BaseWrapper>
    )
}

export default Home
