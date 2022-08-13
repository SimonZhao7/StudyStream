import React from 'react'
import { MainWrapper } from '../../globalStyles'
import { NotFoundContent } from './404.styles'

const NotFoundPage = () => {
    return (
        <MainWrapper>
            <NotFoundContent>
                <h1>Whoops...</h1>
                <h1>The page you are looking for does not exist.</h1>
            </NotFoundContent>
        </MainWrapper>
    )
}

export default NotFoundPage