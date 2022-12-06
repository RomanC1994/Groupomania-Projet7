import styled from 'styled-components'
import colors from '../../utils/colors'
import propTypes from 'prop-types'
import axios from 'axios'
import React, { useState, useContext } from 'react'
import { TokenContext } from '../../utils/context/index2'
import { Link } from 'react-router-dom'


const ComponentContainer = styled.div`
height: 100%;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
width: 100%;
`

const ButtonContainer = styled.div`
color: white;
width: 60%;
height: 60px;
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
padding: 5% 0% 1% 0%;

@media (min-width: 1000px) {
    width: 60%;
}

@media (max-width: 1000px) {
    width: 75%;
}

@media (max-width: 750px) {
    width: 90%;
}

@media (max-width: 450px) {
    width: 120%;
}
`

const LogButton = styled.button`
background-color: white;
color: ${colors.backgroundLight};
text-align: center;
width: 75%;
height: 100%;
border-radius: 5px;
border: none;
`

const SubmitButton = styled.button`
color: white;
text-align: center;
width: 75%;
height: 100%;
border-radius: 5px;
border: none;
`

const FormContainer = styled.div`
background-color: white;
color: ${colors.backgroundLight};
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
width: 60%; 
height: 450px;
border-radius: 5px;

@media (min-width: 1000px) {
    width: 60%;
    height: 450px;
}

@media (max-width: 1000px) {
    width: 75%;
    height: 400px;
}

@media (max-width: 750px) {
    width: 90%;
    height: 400px;
}

@media (max-width: 450px) {
    width: 120%;
    height: 350px;
}
`
const FormTitle = styled.h2`
color: ${colors.primary};
text-align: center;
width: 100%;
height: 15%;
margin-top: 10%;

@media (min-width: 1000px) {
    font-size: 35px;
}

@media (max-width: 1000px) {
    font-size: 30px;
}

@media (max-width: 750px) {
    font-size: 25px;
}

@media (max-width: 450px) {
    font-size: 20px;
}
`
const UserMail = styled.input`
background-color: white;
color: ${colors.backgroundLight};
text-align: center;
width: 80%;
height: 20px;
margin: 2% 0% 2% 0%;
border-radius: 5px;
border: 1px solid grey;
`
const Password = styled.input`
background-color: white;
color: ${colors.backgroundLight};
text-align: center;
width: 80%;
height: 20px;
margin: 2% 5% 2% 5%;
border-radius: 5px;
border: 1px solid grey;
`

const Connexion = styled.button`
color: white;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
width: 80%;
height: 50px;
margin: 0% 5% 5% 5%;
text-decoration: none;
border-radius: 5px;
font-size: 15px;
border: none;
`

const StyledLink = styled(Link)`
color: white;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
width: 80%;
height: 50px;
margin: 0% 5% 10% 5%;
text-decoration: none;
border-radius: 5px;
font-size: 15px;
`

function Login({whichHome, setWhichHome}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setToken } = useContext(TokenContext);
    const { setUserPseudo } = useContext(TokenContext);
    const { setUserId } = useContext(TokenContext);
    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [Signedin, setSignedin] = useState('');

    function logUser() {
        setLoginError('');
        setPasswordError('');
        setSignedin('');
        setUserPseudo('');
        setUserId('');
        axios.post("http://localhost:3000/api/auth/login", {
            email: email,
            password: password
        })
        .then((response) => {
            const error = response.data.error
        if (error === "Utilisateur non trouvé !") {
            setLoginError('Utilisateur non trouvé');
            setToken('');
            setSignedin('');
            setUserPseudo('');
            setUserId('');
        }
        else if (error === "Mot de passe incorrect !") {
            setPasswordError('Mot de passe incorrect');
            setToken('');
            setSignedin('');
            setUserPseudo('');
            setUserId('');
        }
        else {
            setToken(response.data.token);
            setUserId(response.data.userId);
            setUserPseudo(response.data.pseudo);
            setSignedin("Vous etes connecté, bienvenue " + response.data.pseudo);
        }
        });
    }

    return (  
        <ComponentContainer>
            <ButtonContainer>
                <LogButton onClick={() => setWhichHome(true)}>Se connecter</LogButton>
                <SubmitButton onClick={() => setWhichHome(false)}>S'inscrire</SubmitButton>
            </ButtonContainer>
            <FormContainer>
                <FormTitle>Connectez-vous</FormTitle>
                <UserMail type='email' placeholder='Votre email' onChange={event => setEmail(event.target.value)} value={email}></UserMail>
                <p>{loginError}</p>
                <Password type='password' placeholder='Votre mot de passe' onChange={event => setPassword(event.target.value)} value={password}></Password>
                <p>{passwordError}</p>
                <p>{Signedin}</p>
                <Connexion onClick={logUser}>Connexion</Connexion>
                <StyledLink to="/Posts">Entrer sur le site</StyledLink>
            </FormContainer>
        </ComponentContainer>
    )
}

Login.prototype = {
    whichHome: propTypes.bool,
    setWhichHome: propTypes.bool,
}

export default Login;