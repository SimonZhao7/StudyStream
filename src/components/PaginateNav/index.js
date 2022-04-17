import React from 'react'
// Styles
import { PaginateWrapper } from './PaginateNav.styles'
// Components
import Button from '../../components/Button'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { goToPage } from '../../redux/features/studySetsSlice'

const PaginateNav = () => {
    const page = useSelector((state) => state.studySets.page)
    const maxPages = useSelector((state) => state.studySets.maxPages)
    const dispatch = useDispatch()

    return (
        <PaginateWrapper>
            <Button
                label='<<'
                onClick={() => dispatch(goToPage(1))}
                color={'var(--secondary-color)'}
                hoverColor={'var(--secondary-color-hover)'}
            />
            <Button
                label='<'
                isDisabled={page === 1}
                onClick={() => dispatch(goToPage(page - 1))}
                color={'var(--secondary-color)'}
                hoverColor={'var(--secondary-color-hover)'}
            />
            <h4>{page} of {maxPages}</h4>
            <Button
                label='>'
                isDisabled={page >= maxPages}
                onClick={() => dispatch(goToPage(page + 1))}
                color={'var(--secondary-color)'}
                hoverColor={'var(--secondary-color-hover)'}
            />
            <Button
                label='>>'
                onClick={() => dispatch(goToPage(maxPages))}
                color={'var(--secondary-color)'}
                hoverColor={'var(--secondary-color-hover)'}
            />
        </PaginateWrapper>
    )
}

export default PaginateNav