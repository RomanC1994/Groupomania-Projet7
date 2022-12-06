import styled from 'styled-components'
import colors from '../../utils/colors'
import axios from 'axios'
import React, { useState, useContext } from 'react'
import { TokenContext } from '../../utils/context/index2'

const FormsContainer = styled.div`
color: ${colors.backgroundLight};
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
padding: 100px 20px 100px 20px;
`

const FormContainer = styled.div`
background-color: white;
color: ${colors.backgroundLight};
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
border-radius: 5px;

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
margin-top: 65px;
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
height: 30px;
margin: 0% 5% 5% 5%;
border-radius: 5px;
border: none;
text-decoration: none;
`

const PostImage = styled.img`
    max-width: 80%;
    margin: 10px;
`

function AddPost() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [imageView, setImageView] = useState([]);
    const [Posted, setPosted] = useState('');
    const { token } = useContext(TokenContext);
    const headToken = 'Bearer ' + token;
    const { userPseudo } = useContext(TokenContext);
    
    function onImageChange(e) {
        setImage(e.target.files[0]);
        setImageView(URL.createObjectURL(e.target.files[0]));
    }

    function createPost() {
        const timeStamp = Date.now();
        let formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("pseudo", userPseudo);
        formData.append("time", timeStamp);

        if (title === '') {
            setPosted('Un post doit avoir un titre !')
        } else  if (description === '') {
            setPosted('Un post doit avoir une description !')
        } else  if (image === '') {
            setPosted('Un post doit avoir une image !')
        } else {
            axios.post("http://localhost:3000/api/posts", formData, {
                headers: {
                    "authorization": headToken,
                    "Content-Type": "multipart/form-data",
            },
            })
            .then((response) => {
                setPosted('Post enregistré !')
            console.log(response.data);
            });
        }
    }

    return (
        <FormsContainer>
            <FormContainer>
                <FormTitle>Ajoutez votre post</FormTitle>
                <Title type='text' placeholder='Le titre de votre post' onChange={event => setTitle(event.target.value)} value={title}></Title>
                <Description type='text' placeholder='La description de votre post' onChange={event => setDescription(event.target.value)} value={description}></Description>
                <Image type="file" multiple accept="image/*" onChange={onImageChange}/>
                <PostImage src={imageView} alt={image.filename}></PostImage>
                <p>{Posted}</p>
                <AjoutPost onClick={createPost}>Ajouter</AjoutPost>
            </FormContainer>
        </FormsContainer>  
    )
}

export default AddPost;