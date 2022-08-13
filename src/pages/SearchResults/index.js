import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
// Styles
import { MainWrapper } from '../../globalStyles'
import { ResultsWrapper, NoResultWrapper, SearchText } from './SearchResults.styles'
// Components
import StudySet from '../../components/StudySet'
import PaginateNav from '../../components/PaginateNav'
import Button from '../../components/Button'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearchSet, goToPage } from '../../redux/features/searchSetSlice'

const SearchResults = () => {
    const results = useSelector((state) => state.searchSet.value)
    const page = useSelector((state) => state.searchSet.page)
    const maxPages = useSelector((state) => state.searchSet.maxPages)
    let searchParams = useSearchParams()[0]
    const navigate = useNavigate()
    let searchTerm = searchParams.get('search')
    const dispatch = useDispatch()

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/home')
        }
        dispatch(fetchSearchSet(`title=${searchTerm}&sort=-created`))
    }, [dispatch, searchTerm, navigate])

    return (
        <MainWrapper style={{ alignItems: 'flex-start' }}>
            {results.length > 0 ? (
                <ResultsWrapper>
                    <SearchText>Results for: "{searchTerm}"</SearchText>
                    {results.map((result, index) => (
                        <StudySet studySet={result} key={index} />
                    ))}
                    <PaginateNav
                        page={page}
                        maxPages={maxPages}
                        pageChangeMethod={goToPage}
                    />
                </ResultsWrapper>
            ) : (
                <NoResultWrapper>
                    <h1>No results for term "{searchTerm}"</h1>
                    <Button
                        label='Return'
                        color={'var(--secondary-color)'}
                        hoverColor={'var(--secondary-color-hover)'}
                        width={'150px'}
                        onClick={() => navigate(-1)}
                    />
                </NoResultWrapper>
            )}
        </MainWrapper>
    )
}

export default SearchResults
