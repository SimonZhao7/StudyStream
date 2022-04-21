import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
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

    const matchInput = () => {
        const { left, right, bottom } =
            searchInput.current.getBoundingClientRect()
        results.current.style.left = `${left}px`
        results.current.style.top = `${bottom + 10}px`
        results.current.style.width = `${right - left}px`
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

    return (
        <SearchForm ref={searchInput}>
            <IconContainer className='fa-solid fa-magnifying-glass'>
                <SearchInput
                    placeholder='Search Study Sets'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={() => setShowResults(true)}
                />
            </IconContainer>
            {showResults && (
                <ResultWrapper ref={results}>
                    {searchResults.length > 0 ? searchResults.slice(0, 5).map((result, index) => {
                        const { title, _id: id } = result
                        return (
                            <Link to={`/study/${id}`} key={index}>
                                <Button
                                    label={title}
                                    color={'white'}
                                    hoverColor={'#f5f5f5'}
                                />
                            </Link>
                        )
                    }) : (
                        <h2>No Results...</h2>
                    )}
                </ResultWrapper>
            )}
        </SearchForm>
    )
}

export default SearchBar