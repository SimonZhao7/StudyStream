import React, { useEffect } from 'react'
// Styles
import { BaseWrapper } from '../../globalStyles'
import { StudySetsWrapper } from './Home.styles'
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
    const token = localStorage.getItem('jwt')

    useEffect(() => {
        dispatch(login(token))
    }, [dispatch, token])

    return (
        <BaseWrapper>
            {!loading && (
                <>
                    <h1 style={{ marginBottom: '50px' }}>Hello {username}!</h1>
                    {recentlyViewedSets.length > 0 ? (
                        <p>Here are your most recently viewed study sets!</p>
                    ) : (
                        <p>
                            You have no previously viewed study sets. Get
                            studying!!!
                        </p>
                    )}
                    <StudySetsWrapper>
                        {recentlyViewedSets.map((studySet, index) => (
                            <StudySet studySet={studySet} key={index} />
                        ))}
                        {recentlyViewedSets.length % 3 !== 0 &&
                        (recentlyViewedSets.length + 1) % 3 === 0 ? (
                            <div></div>
                        ) : (
                            <>
                                <div></div>
                                <div></div>
                            </>
                        )}
                    </StudySetsWrapper>
                </>
            )}
        </BaseWrapper>
    )
}

export default Home