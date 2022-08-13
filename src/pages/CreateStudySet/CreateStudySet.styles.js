import styled from 'styled-components'


export const CreateFormWrapper = styled.section`
    width: 550px;
    height: auto;
    background-color: white;
    padding: 60px 30px;
    border-radius: 3px;
    color: var(--dark-gray);
    
    margin-bottom: 150px;

    @media screen and (max-width: 576px) {
        padding: 40px 15px;
    }
`

export const CreateForm = styled.form`
    flex: 1;
`