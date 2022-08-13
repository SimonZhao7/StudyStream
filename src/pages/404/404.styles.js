import styled from 'styled-components'


export const NotFoundContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100px;

    h1 {
        text-align: center;

        :first-child {
            font-size: 60px;
        }

        @media screen and (max-width: 576px) {
            :first-child {
                font-size: 46px;
            }
            font-size: 24px;
        }
    }
`