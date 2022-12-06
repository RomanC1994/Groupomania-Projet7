import styled from 'styled-components'
import colors from '../../utils/colors'
import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { TokenContext } from '../../utils/context/index2'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import logo from '../../utils/logos/logo.png'
import logoSphere from '../../utils/logos/logoSphere.png'

const PostsTitle = styled.h1`
    margin-top: 50px;
    text-align: center;

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

const LogoContainer = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
`

const LogoDiv = styled.img`
    color: white;
    width: 40%;

    @media (min-width: 1000px) {
        width: 30%;
    }
`

const PostsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`

const PostContainer = styled(Link)`
background-color: white;
color: ${colors.backgroundLight};
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
width: 50%; 
padding: 5px 10px 5px 20px;
margin: 20px;
border-radius: 5px;
text-decoration: none;

@media (min-width: 1000px) {
    width: 60%;
}

@media (max-width: 1000px) {
    width: 70%;
}

@media (max-width: 750px) {
    width: 75%;
}

@media (max-width: 450px) {
    width: 80%;
}
`

const PostHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    background-color: white;
`

const PostTitle = styled.h2`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 80%;
    font-size: 25px;

    @media (min-width: 1000px) {
        font-size: 22px;
    }
    
    @media (max-width: 1000px) {
        font-size: 20px;
    }
    
    @media (max-width: 750px) {
        font-size: 16px;
    }
    
    @media (max-width: 450px) {
        font-size: 12px;
    }
`

const PostAuthor = styled(Link)`
    font-size: 18px;
    background-color: white;
    text-decoration: none;
    color: ${colors.primary};

    @media (min-width: 1000px) {
        font-size: 18px;
    }
    
    @media (max-width: 1000px) {
        font-size: 16px;
    }
    
    @media (max-width: 750px) {
        font-size: 14px;
    }
    
    @media (max-width: 450px) {
        font-size: 11px;
    }
`

const PostDesciption = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 10px;
    width: 60%;
    background-color: white;

    @media (min-width: 1000px) {
        font-size: 18px;
    }
    
    @media (max-width: 1000px) {
        font-size: 16px;
    }
    
    @media (max-width: 750px) {
        font-size: 14px;
    }
    
    @media (max-width: 450px) {
        font-size: 11px;
    }
`

const PostImage = styled.img`
    max-width: 85%;
`

const PostLikes = styled.div`
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
` 

const Likes = styled.p`
    font-weight: bold;
    margin: 4px 0px 0px 0px;
`

const LoaderContainer = styled.div`
    margin-top: 100px;
    height: 300px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    z-index: 2;
`

const LoaderSphereFirst = styled.img`
    position: relative;
    height: 75px;
    width: 75px;
    animation-delay: 100ms;
    animation: sphere_load_first 900ms 200ms both infinite;
    
@keyframes sphere_load_first {
    0% {
        bottom: 0%;
    }
    25% {
        bottom: 20%;
        transform: scaleX(0.9) scaleY(1.1);
    }
    40% {
        bottom: 10%;
        transform: scaleX(0.9) scaleY(1.1);
    }
    50% {
        bottom: 0%;
        transform: scaleX(1.4) scaleY(0.6);
    }
    60% {
        bottom: 0%;
        transform: scaleX(1) scaleY(1);
    }
    100% {
        bottom: 0%;
        transform: scaleX(1) scaleY(1);
    }
}
`

const LoaderSphereSecond = styled.img`
    position: relative;
    height: 75px;
    width: 75px;
    animation-delay: 200ms;
    animation: sphere_load_second 900ms 400ms both infinite;
    
@keyframes sphere_load_second {
    0% {
        bottom: 0%;
    }
    25% {
        bottom: 20%;
        transform: scaleX(0.9) scaleY(1.1);
    }
    40% {
        bottom: 10%;
        transform: scaleX(0.9) scaleY(1.1);
    }
    50% {
        bottom: -5%;
        transform: scaleX(1.4) scaleY(0.6);
    }
    60% {
        bottom: 0%;
        transform: scaleX(1) scaleY(1);
    }
    100% {
        bottom: 0%;
        transform: scaleX(1) scaleY(1);
    }
}
`

const LoaderSphereThird = styled.img`
    position: relative;
    height: 75px;
    width: 75px;
    animation-delay: 300ms;
    animation: sphere_load_third 900ms 600ms both infinite;
    
@keyframes sphere_load_second {
    0% {
        bottom: 0%;
    }
    25% {
        bottom: 20%;
        transform: scaleX(0.9) scaleY(1.1);
    }
    40% {
        bottom: 10%;
        transform: scaleX(0.9) scaleY(1.1);
    }
    50% {
        bottom: -5%;
        transform: scaleX(1.4) scaleY(0.6);
    }
    60% {
        bottom: 0%;
        transform: scaleX(1) scaleY(1);
    }
    100% {
        bottom: 0%;
        transform: scaleX(1) scaleY(1);
    }
}

@keyframes sphere_load_third {
    0% {
        bottom: 0%;
    }
    25% {
        bottom: 20%;
        transform: scaleX(0.9) scaleY(1.1);
    }
    40% {
        bottom: 10%;
        transform: scaleX(0.9) scaleY(1.1);
    }
    50% {
        bottom: -5%;
        transform: scaleX(1.4) scaleY(0.6);
    }
    60% {
        bottom: 0%;
        transform: scaleX(1) scaleY(1);
    }
    100% {
        bottom: 0%;
        transform: scaleX(1) scaleY(1);
    }
}
`

function Post() {

    const [posts, setPosts] = useState([]);
    const postsDescending = [...posts].sort((a, b) => a.time > b.time ? -1 : 1,);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useContext(TokenContext);
    const headToken = 'Bearer ' + token;
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    useEffect(() => {
        async function makeRequest() {
            await delay(0);
            axios.get("http://localhost:3000/api/posts", {
                headers: {"authorization": headToken},
            })
            .then((response) => {
                setPosts(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
          }
          makeRequest();
     },[]);
    return isLoading ? ( 
        <div>
        <PostsTitle>CHARGEMENT EN COURS</PostsTitle>
        <LoaderContainer>
            <LoaderSphereFirst src={logoSphere}></LoaderSphereFirst>
            <LoaderSphereSecond src={logoSphere}></LoaderSphereSecond>
            <LoaderSphereThird src={logoSphere}></LoaderSphereThird>
        </LoaderContainer>
        </div>
    ) : (
        <div>
        <LogoContainer>
            <LogoDiv src={logo} alt={logo}></LogoDiv>
        </LogoContainer>
            <div>
                <PostsContainer>
                    {postsDescending.map((post)=> (
                        <PostContainer key={`${post.title}-${post.userId}-${Date.now()}`} to={`/Details/${post._id}`}>
                            <PostHeader> 
                                <PostTitle>{post.title}</PostTitle>
                                <PostAuthor to={`/Profil/${post.userId}`}>par {post.pseudo}</PostAuthor>
                            </PostHeader>
                            <PostImage src={post.imageUrl} alt={post.imageUrl.split('/images/')[1]}></PostImage>
                            <PostDesciption> {post.description} </PostDesciption>
                            <PostLikes>
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <Likes>{post.likes}</Likes>
                            </PostLikes>
                        </PostContainer>
                    ))}
                </PostsContainer>
            </div>
        </div>
    )
}

export default Post;