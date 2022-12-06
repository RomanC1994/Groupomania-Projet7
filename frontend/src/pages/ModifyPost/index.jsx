import styled from 'styled-components'
import colors from '../../utils/colors'
import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { TokenContext } from '../../utils/context/index2'

const FormsContainer = styled.div`
color: ${colors.backgroundLight};
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
padding: 50px 20px 100px 20px;
`

const FormContainer = styled.div`
background-color: white;
color: ${colors.backgroundLight};
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
border-radius: 5px;
width: 50%;
margin: 20px 0px 20px 0px;
padding: 5px 5px 20px 20px;

@media (min-width: 1200px) {
    width: 60%;
    
}

@media (max-width: 1200px) {
    width: 65%;
    
}

@media (max-width: 1000px) {
    width: 70%;
    
}

@media (max-width: 750px) {
    width: 80%;
    
}

@media (max-width: 450px) {
    width: 90%;
    
}
`

const FormTitle = styled.h2`
background-color: white;
color: ${colors.primary};
text-align: center;
width: 100%;
font-size: 35px;

@media (max-width: 1000px) {
    font-size: 32px;
}

@media (max-width: 750px) {
    font-size: 30px;
}

@media (max-width: 450px) {
    font-size: 25px;
}
`
const Title = styled.input`
background-color: white;
color: ${colors.backgroundLight};
text-align: center;
width: 50%;
height: 20px;
margin: 2% 5% 2% 5%;
border-radius: 5px;
border: ${colors.backgroundLight} solid 1px;
`
const Description = styled.textarea`
background-color: white;
color: ${colors.backgroundLight};
text-align: center;
min-width: 50%;
height: 20px;
margin: 2% 5% 2% 5%;
border-radius: 5px;
max-width: 80%;
border: ${colors.backgroundLight} solid 1px;
`

const Image = styled.input` 
background-color: white;
color: ${colors.backgroundLight};
text-align: center;
width: 40%;
padding-bottom: 20px;
`

const AjoutPost = styled.button`
color: white;
text-align: center;
width: 50%;
height: 40px;
margin: 0% 5% 5% 5%;
border-radius: 5px;
border: none;
`

const PostImage = styled.img`
    max-width: 80%;
    margin: 10px;
`

const PostContainer = styled.div`
background-color: white;
color: ${colors.backgroundLight};
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
width: 50%; 
margin: 20px 0px 20px 0px;
padding: 5px 5px 20px 20px;
border-radius: 5px;
text-decoration: none;

@media (min-width: 1200px) {
    width: 60%;
    
}

@media (max-width: 1200px) {
    width: 65%;
    
}

@media (max-width: 1000px) {
    width: 70%;
    
}

@media (max-width: 750px) {
    width: 80%;
    
}

@media (max-width: 450px) {
    width: 90%;
    
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

const PostAuthor = styled.a`
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


function ModifyPost() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState([]);
    const [imageView, setImageView] = useState([]);
    const [postDetail, setPostDetail] = useState([]);
    const { token } = useContext(TokenContext);
    const headToken = 'Bearer ' + token;
    const { userPseudo } = useContext(TokenContext);
    const postParams = useParams();
    const postId = postParams.postId;

    useEffect(() => {

        axios.get(`http://localhost:3000/api/posts/Detail/${postId}`, {
            headers: {"authorization": headToken},
        })
        .then((response) => {
            setPostDetail(response.data);
            setTitle(response.data.title);
            setDescription(response.data.description);
        })
        .catch((error) => {
            console.log(error);
        });
     },[])

     useEffect(() => {

        axios.get(`http://localhost:3000/api/posts/Detail/${postId}`, {
            headers: {"authorization": headToken},
        })
        .then((response) => {
            setPostDetail(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
     },)
    
    function onImageChange(e) {
        setImage(e.target.files[0]);
        setImageView(URL.createObjectURL(e.target.files[0]));
    }
    
    function modifyPost() {
        let formData = new FormData();
        formData.append("image", image);
        formData.append("userId", token);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("pseudo", userPseudo);

        axios.put(`http://localhost:3000/api/posts/${postId}`, formData, {

            headers: {
                "authorization": headToken,
        },
        })
        .then((response) => {
        console.log(response.data);
        });
    }

    return (
            <FormsContainer>
                <PostContainer>
                    <PostHeader> 
                        <PostTitle>{postDetail.title}</PostTitle>
                        <PostAuthor>par {postDetail.pseudo}</PostAuthor>
                    </PostHeader>
                    <PostImage src={postDetail.imageUrl} alt={postDetail.imageUrl}></PostImage>
                    <PostDesciption>{postDetail.description}</PostDesciption>
                </PostContainer>
                <FormContainer>
                    <FormTitle>Modifiez votre post</FormTitle>
                    <Title type='text' onChange={event => setTitle(event.target.value)} value={title} placeholder={postDetail.title}></Title>
                    <Description type='text' onChange={event => setDescription(event.target.value)} value={description} placeholder={postDetail.description}></Description>
                    <Image type="file" multiple accept="image/*" onChange={onImageChange}/>
                    <PostImage src={imageView} alt={image.filename}></PostImage>
                    <AjoutPost onClick={modifyPost}>Modifier</AjoutPost>
                </FormContainer>
            </FormsContainer>  
    )
}

export default ModifyPost;