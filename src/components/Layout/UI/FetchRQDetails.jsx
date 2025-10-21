import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPostById } from '../../../API/api'
import { useParams } from 'react-router'
const FetchRQDetails = () => {

    const { id } = useParams()

    const getPostData = async () => {
        const response = await getPostById(id)
        if(response.status !== 200){
            throw new Error(`Failed to fetch post. Status: ${response.status}`)
        }
        return response.data
    }


    const { data: post, isLoading, error } = useQuery({
        queryKey: ['post', id],
        queryFn: getPostData,

    })

  return (
    <div className='bg-white p-4 mt-10 rounded-lg shadow-md border border-gray-200'>
        <h1>FetchRQDetails</h1>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {post && <div>{post.title}</div>}
    </div>
  )
}

export default FetchRQDetails