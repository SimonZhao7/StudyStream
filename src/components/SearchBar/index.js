import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// Styles
import {
    SearchForm,
    IconContainer,
    SearchInput,
    ResultWrapper,
} from './SearchBar.styles'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearchSet } from '../../redux/features/searchSetSlice'
// Components
import Button from '../Button'

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [showResults, setShowResults] = useState(false)
    const searchResults = useSelector((state) => state.searchSet.value)
    const searchInput = useRef()
    const results = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const matchInput = () => {
        const { left, right, bottom } =
            searchInput.current.getBoundingClientRect()
        results.current.style.left = `${left}px`
        results.current.style.top = `${bottom + 10}px`
        results.current.style.width = `${right - left}px`
        results.current.style.display = 'block'
    }

    const clearResults = () => {
        setShowResults(false)
        setSearchTerm('')
        dispatch(clearResults())
    }

    useEffect(() => {
        const handleClickEvent = (e) => {
            if (showResults && !results.current.contains(e.target)) {
                setShowResults(false)
            }
        }

        if (searchTerm) {
            dispatch(fetchSearchSet(`title=${searchTerm}&sort=-created`))
        }

        if (showResults) {
            matchInput()
        }
        
        window.addEventListener('click', handleClickEvent)
        window.addEventListener('resize', matchInput)
        return () => {
            window.removeEventListener('resize', matchInput)
            window.removeEventListener('click', handleClickEvent)
        }
    }, [searchTerm, dispatch, showResults])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchTerm) {
            navigate(`/results/?search=${searchTerm}`)
            clearResults()
        }
    }

    return (
        <>
            <SearchForm ref={searchInput} onSubmit={handleSubmit}>
                <IconContainer className='fa-solid fa-magnifying-glass'>
                    <SearchInput
                        placeholder='Search Study Sets'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={() => setShowResults(true)}
                    />
                </IconContainer>
            </SearchForm>
            {showResults && (
                <ResultWrapper ref={results}>
                    {searchResults.length > 0 ? (
                        searchResults.slice(0, 5).map((result, index) => {
                            const { title, _id: id } = result
                            return (
                                <Link
                                    to={`/study/${id}`}
                                    key={index}
                                    onClick={clearResults}
                                >
                                    <Button
                                        label={title}
                                        color={'white'}
                                        hoverColor={'#f5f5f5'}
                                    />
                                </Link>
                            )
                        })
                    ) : (
                        <h2>No Results...</h2>
                    )}
                </ResultWrapper>
            )}
        </>
    )
}

export default SearchBar