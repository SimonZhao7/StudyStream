import styled from 'styled-components'

export const EditWrapper = styled.section`
    width: 100%;
    height: 550px;
    padding: 10px;
    background-color: white;
    color: var(--dark-gray);
    border-radius: 5px;
    display: flex;
    gap: 20px;

    h2 {
        margin: 0;
        padding: 15px 0
    }
`

export const ContentHalf = styled.section`
    flex: 1;
    overflow-y: scroll;
    
    ::-webkit-scrollbar {
        display: none;
    }
`

export const NotifText = styled.p`
    font-size: 18px;
    text-align: center;
`