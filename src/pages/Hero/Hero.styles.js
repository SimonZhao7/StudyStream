import styled from 'styled-components'
import heroBackground from '../../assets/hero-background.jpg'

export const HeroWrapper = styled.main`
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: url('${heroBackground}');
`

export const HeroFilter = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 125px 100px 75px;
    overflow-y: scroll;

    h1 {
        font-size: 44px;
        font-weight: 600;
    }

    h3 {
        width: 475px;
        font-size: 22px;
    }

    button {
        width: 20%;
    }

    @media screen and (max-width: 768px) {
        h1 {
            font-size: 38px;
            width: 100%;
        }

        h3 {
            font-size: 18px;
            width: 100%;
        }

        button {
            width: 50%;
        }
    }

    @media screen and (max-width: 576px) {
        padding: 75px 30px 75px;
        
        button {
            width: 200px;
        }
    }
`

export const BenefitsWrapper = styled.section`
    margin-top: 200px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;

    @media screen and (max-width: 768px) {
        margin-top: 100px;
    }

    @media screen and (max-width: 576px) {
        grid-template-columns: 1fr;
    }
`

export const BenefitWrapper = styled.div`
    text-overflow: wrap;
    
    h2 {
        font-size: 36px;
        font-weight: 600;
        margin-top: 0;
    }

    h2, h3 {
        width: 100%;
    }

    @media screen and (max-width: 768px) {
        font-size: 32px;
    }
`

export const WordAccent = styled.div`
    height: 10px;
    width: 100px;
    border-radius: 3px;
    background-color: var(--secondary-color);
`
