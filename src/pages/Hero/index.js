import React from 'react'
// Styles
import {
    HeroWrapper,
    HeroFilter,
    BenefitsWrapper,
    WordAccent,
    BenefitWrapper,
} from './Hero.styles'
// Components
import Button from '../../components/Button'

const Hero = () => {
    return (
        <HeroWrapper>
            <HeroFilter>
                <h1>Flashcards & music in one page</h1>
                <h3>
                    Create your own study set with your own music or discover
                    new songs and knowledge with study sets created by other
                    users.
                </h3>
                <Button label='Get Started' width='20%' />
                <BenefitsWrapper>
                    <BenefitWrapper>
                        <WordAccent></WordAccent>
                        <h2>Extensive Music</h2>
                        <h3>
                            We use Spotify’s music library in order to provide
                            the most variety possible.
                        </h3>
                    </BenefitWrapper>
                    <BenefitWrapper>
                        <WordAccent></WordAccent>
                        <h2>Free to Use</h2>
                        <h3>
                            There is no cost in using the services provided by
                            Study Stream
                        </h3>
                    </BenefitWrapper>
                    <BenefitWrapper>
                        <WordAccent></WordAccent>
                        <h2>Unique Experiences</h2>
                        <h3>
                            Each study set has a unique user generated playlist
                            to make studying a unique experience
                        </h3>
                    </BenefitWrapper>
                </BenefitsWrapper>
            </HeroFilter>
        </HeroWrapper>
    )
}

export default Hero
