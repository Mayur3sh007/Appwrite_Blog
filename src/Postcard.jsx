import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function Postcard({$id,Title,Image}) {      //that $id is just a syntax of appwrite

    return (
        <Link to={`/post/${$id}`}>      {/* Just some syntax shit */}
            <div className='w-full bg-gray-100 rounded-xl p-4'>

                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(Image)} alt={Title} className='rounded-xl' />  {/* So this image is actually an ID we get from database for the image. Which now we pass into our FilePreview Function in appwrite/config.js  */}
                </div>

                <h2
                className='text-xl font-bold'
                >
                    {Title}
                </h2>
                
            </div>
        </Link>
      )

}

export default Postcard