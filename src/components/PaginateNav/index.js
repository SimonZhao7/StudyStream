import React from 'react'
// Styles
import { PaginateWrapper } from './PaginateNav.styles'
// Components
import Button from '../../components/Button'
// Redux
import { useDispatch } from 'react-redux'

const PaginateNav = ({ page, maxPages, pageChangeMethod }) => {
    const dispatch = useDispatch()

    return (
        <PaginateWrapper>
            <Button
                label='<<'
                onClick={() => dispatch(pageChangeMethod(1))}
                color={'var(--secondary-color)'}
                hoverColor={'var(--secondary-color-hover)'}
            />
            <Button
                label='<'
                isDisabled={page === 1}
                onClick={() => dispatch(pageChangeMethod(page - 1))}
                color={'var(--secondary-color)'}
                hoverColor={'var(--secondary-color-hover)'}
            />
            <h4>
                {page} of {maxPages}
            </h4>
            <Button
                label='>'
                isDisabled={page >= maxPages}
                onClick={() => dispatch(pageChangeMethod(page + 1))}
                color={'var(--secondary-color)'}
                hoverColor={'var(--secondary-color-hover)'}
            />
            <Button
                label='>>'
                onClick={() => dispatch(pageChangeMethod(maxPages))}
                color={'var(--secondary-color)'}
                hoverColor={'var(--secondary-color-hover)'}
            />
        </PaginateWrapper>
    )
}

export default PaginateNav