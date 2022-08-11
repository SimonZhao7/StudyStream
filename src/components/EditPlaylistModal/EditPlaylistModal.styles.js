import styled from 'styled-components'

export const EditWrapper = styled.section`
    position: relative;
    width: 100%;
    height: 550px;
    padding: 10px;
    background-color: white;
    color: var(--dark-gray);
    border-radius: 3px;
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

export const MobileMenu = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 30px; 
    height: 30px;
    background-color: var(--secondary-color);
    color: white;
    border-radius: 0 3px 3px 3px;
`

export const MenuActions = styled.div`
    position: absolute;
    top: 0;
    right: 30px;
`   