import styled from 'styled-components'

export const ModalWrapper = styled.section`
    background-color: rgba(0, 0, 0, 0.65);
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
`

export const FormWrapper = styled.div`
    width: ${props => props.special ? '700px': '650px'};

    @media screen and (max-width: 768px) {
        width: ${props => props.special ? '90%' : '500px'};
    }

    @media screen and (max-width: 576px) {
        width: 90%;
    }
`