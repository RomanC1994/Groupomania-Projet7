import styled from 'styled-components'
import colors from '../../utils/colors'
import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { TokenContext } from '../../utils/context/index2'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'


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

const PostsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: row;
    align-items: center;
`

const PostContainer = styled.div`
background-color: white;
color: ${colors.backgroundLight};
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
width: 50%; 
margin: 20px 0px 50px 0px;
padding: 5px 5px 20px 20px;
border-radius: 5px;
text-decoration: none;

@media (min-width: 1000px) {
    width: 60%;
}

@media (max-width: 1000px) {
    width: 70%;
}

@media (max-width: 750px) {
    width: 80%;
}

@media (max-width: 450px) {
    width: 85%;
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

const PostDelete = styled(Link)`
color: white;
text-align: center;
width: 35%;
text-decoration: none;
margin: 5% 5% 5% 5%;
border-radius: 5px;
border: none;
font-size: 15px;

@media (min-width: 1000px) {
    font-size: 15px;
}

@media (max-width: 1000px) {
    font-size: 14px;
}

@media (max-width: 750px) {
    font-size: 13px;
}

@media (max-width: 450px) {
    font-size: 12px;
}
`

const PostModify = styled(Link)`
color: white;
text-align: center;
width: 35%;
text-decoration: none;
border: solid black 
border: none;2px;
border-radius: 5px;
font-size: 15px;

@media (min-width: 1000px) {
    font-size: 15px;
}

@media (max-width: 1000px) {
    font-size: 14px;
}

@media (max-width: 750px) {
    font-size: 13px;
}

@media (max-width: 450px) {
    font-size: 12px;
}
`

const LikeContainer = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
`

const LikeButton = styled.button`
    height: 25px;
    width: 25px;
    border-radius: 50px;
    border: none;
    margin: 5px 0px 5px 0px;
    color: white;
`

function Details() {
    const [postDetail, setPostDetail] = useState([]);
    const [liked, setLiked] = useState();
    const [likedColor, setLikedColor] = useState();
    const { userId } = useContext(TokenContext);
    const { token } = useContext(TokenContext);
    const { userPseudo } = useContext(TokenContext);
    const headToken = 'Bearer ' + token;
    const postParams = useParams();
    const postId = postParams.postId;

    useEffect(() => {

        axios.get(`http://localhost:3000/api/posts/Detail/${postId}`, {
            headers: {"authorization": headToken},
        })
        .then((response) => {
            setPostDetail(response.data);
            if(response.data.usersLiked.includes(userId) ) {
                setLiked('Vous aimez ce post');
                setLikedColor(colors.primary);
            }
            else {
                setLiked("Vous n'aimez pas encore ce post");
                setLikedColor(colors.secondary);
            }
        })
        .catch((error) => {
            console.log(error);
        });
     },)

     function onLike () {
        axios.post(`http://localhost:3000/api/posts/${postId}/like`, {
        userId: token,
        },
        {
            headers: {"authorization": headToken},
        })
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }

     function deletePost () {

        axios.delete(`http://localhost:3000/api/posts/${postId}`, {
            headers: {"authorization": headToken},
        })
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    if (postDetail.pseudo === userPseudo || userPseudo === 'AdminDev') {
        return (
            <div>
                <PostsTitle>Details du post</PostsTitle>
                <div>
                        <PostsContainer>
                            <PostContainer>
                                <PostHeader> 
                                    <PostTitle>{postDetail.title}</PostTitle>
                                    <PostAuthor>par {postDetail.pseudo}</PostAuthor>
                                </PostHeader>
                                <PostImage src={postDetail.imageUrl} alt={postDetail.imageUrl}></PostImage>
                                <PostDesciption>{postDetail.description}</PostDesciption>
                                <LikeContainer>
                                    <LikeButton onClick={onLike} style={{backgroundColor: likedColor}} name='LikeButton'><FontAwesomeIcon icon={faThumbsUp} /></LikeButton>{liked}
                                </LikeContainer>
                                <PostDelete onClick={deletePost} to='/Posts'> Supprimer </PostDelete>
                                <PostModify to={`/Update/${postId}`}> Modifier </PostModify>
                            </PostContainer>
                        </PostsContainer>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <PostsTitle>Details du post</PostsTitle>
                <div>
                        <PostsContainer>
                            <PostContainer>
                            <PostHeader> 
                                    <PostTitle>{postDetail.title}</PostTitle>
                                    <PostAuthor>par {postDetail.pseudo}</PostAuthor>
                                </PostHeader>
                                <PostImage src={postDetail.imageUrl}></PostImage>
                                <PostDesciption>{postDetail.description}</PostDesciption>
                                <LikeContainer>
                                    <LikeButton onClick={onLike} style={{backgroundColor: likedColor}} name='LikeButton'><FontAwesomeIcon icon={faThumbsUp} /></LikeButton>{liked}
                                </LikeContainer>
                            </PostContainer>
                        </PostsContainer>
                </div>
            </div>
        )
    }
    
}

export default Details;