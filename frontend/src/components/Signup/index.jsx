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

const SubmitButton = styled.button`
background-color: white;
color: ${colors.backgroundLight};
text-align: center;
width: 75%;
height: 100%;
border-radius: 5px;
border: none;
`

const LogButton = styled.button`
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
const Pseudo = styled.input`
background-color: white;
color: ${colors.backgroundLight};
text-align: center;
width: 80%;
height: 20px;
margin: 2% 0% 2% 0%;
border-radius: 5px;
border: 1px solid grey;
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

const PasswordError = styled.p `
text-align: center;
`

function Signup({whichHome, setWhichHome}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pseudo, setPseudo] = useState('');
    const { setToken } = useContext(TokenContext);
    const { setUserId } = useContext(TokenContext);
    const { setUserPseudo } = useContext(TokenContext);
    const { setIsAdmin } = useContext(TokenContext);
    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [Signedin, setSignedin] = useState('');

    function createUser() {
        setLoginError('');
        setPasswordError('');
        setSignedin('');
        setUserPseudo('');
        setIsAdmin('');
        axios.post("http://localhost:3000/api/auth/signup", {
            pseudo: pseudo,
            email: email,
            password: password
        })
        .then((response) => {
            const error = response.data.error
            if (error === "Mot de passe incorrect") {
                setPasswordError("Ce mot de passe ne convient pas, un mot de passe doit contenir une majuscule, une minuscule, au moins 8 caractères et deux chiffres. Il ne doit pas contenir d'espaces.");
                setLoginError('');
                setPasswordError('');
                setSignedin('');
                setUserPseudo('');
                setIsAdmin('');
            }
            else {
                setSignedin('Vous etes inscrit');
                axios.post("http://localhost:3000/api/auth/login", {
                    email: email,
                    password: password
                })
                .then((response) => {
                    const error = response.data.error
                if (error === "Utilisateur non trouvé !") {
                }
                else if (error === "Mot de passe incorrect !") {
                }
                else {
                    setToken(response.data.token);
                    setUserPseudo(response.data.pseudo);
                }
                });
            }
        });
    }

    function checkInput() {
        if (!email.includes('@') || !email.includes('.')) {
            setLoginError('Email invalide, un email doit contenir une "@" et un "." !')
        }
        else {
            createUser();
        }
    }

    return (  
        <ComponentContainer>
            <ButtonContainer>
                <LogButton onClick={() => setWhichHome(true)}>Se connecter</LogButton>
                <SubmitButton onClick={() => setWhichHome(false)}>S'inscrire</SubmitButton>
            </ButtonContainer>
            <FormContainer>
                <FormTitle>Inscrivez-vous</FormTitle>
                <Pseudo type='pseudo' placeholder='Votre pseudo' onChange={(e) => setPseudo(e.target.value)} value={pseudo}></Pseudo>
                <UserMail type='email' placeholder='Votre email' onChange={(e) => setEmail(e.target.value)} value={email}></UserMail>
                <p>{loginError}</p>
                <Password type='password' placeholder='Votre mot de passe' onChange={event => setPassword(event.target.value)} value={password}></Password>
                <PasswordError>{passwordError}</PasswordError>
                <p>{Signedin}</p>
                <Connexion onClick={checkInput}>Inscription</Connexion>
                <StyledLink to="/Posts">Entrer sur le site</StyledLink>
            </FormContainer>
        </ComponentContainer>
    )
}

Signup.prototype = {
    email: propTypes.string,
    setEmail: propTypes.string,
    password: propTypes.string,
    setPassword: propTypes.string,
    loginError: propTypes.string,
    setLoginError: propTypes.string,
    passwordError: propTypes.string,
    setPasswordError: propTypes.string,
}

export default Signup;