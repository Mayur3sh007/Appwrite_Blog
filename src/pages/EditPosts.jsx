import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    
    const [post, setPosts] = useState(null)
    const {slug} = useParams()          //We use useParams to get URLs
    const navigate = useNavigate()

    useEffect(()=>{

        if(slug)
        {
            appwriteService.getPost(slug)
            .then((post) => {
                
                if(post)
                {
                    setPosts(post);
                }
                else
                {
                    navigate('/');
                }

            } )
        }

    },[slug,navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post = {post} /> {/* We can also just say post = {post} but this will give us only 1post so we spread post to get all */}
            </Container>
        </div>
  ) : null
}

export default EditPost