import propTypes from 'prop-types'
import styled from 'styled-components'
import Login from '../../components/Login'
import Signup from '../../components/Signup'
import { useState } from 'react'
import logo from '../../utils/logos/logo.png'

const HomeBackground = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

const HomeHeader = styled.div`
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const HomeContainer = styled.div`
    width: 60%;
    height: 600px; 
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-radius: 25px;
    margin-bottom: 50px;
    
    @media (min-width: 1000px) {
        margin-bottom: 50px;
    }
    
    @media (max-width: 1000px) {
        margin-bottom: 40px;
    }
    
    @media (max-width: 750px) {
        margin-bottom: 30px;
    }
    
    @media (max-width: 450px) {
        margin-bottom: 20px;
    }
`

const LogoDiv = styled.img`
    color: white;
    width: 40%;
`

function Home() {
    const [whichHome, setWhichHome] = useState(true);
    return whichHome ? (
        <div>
            <HomeBackground>
            <HomeHeader>
            <LogoDiv src={logo} alt={logo}></LogoDiv>
            </HomeHeader>
            <HomeContainer>
            <Login whichHome={whichHome} setWhichHome={setWhichHome}/>
            </HomeContainer>
        </HomeBackground>
        </div>
    ) : (
        <HomeBackground>
            <HomeHeader>
              <LogoDiv src={logo} alt={logo}></LogoDiv>
            </HomeHeader>
            <HomeContainer>
                <Signup whichHome={whichHome} setWhichHome={setWhichHome}/>
            </HomeContainer>
        </HomeBackground>
    )
}

Home.prototype = {
    whichHome: propTypes.bool,
    setWhichHome: propTypes.bool,
}

export default Home;