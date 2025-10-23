import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { getPostById, Post } from '@/API/api'

const FetchRQDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const { data: post, isLoading, error } = useQuery<Post, Error>({
    queryKey: ['post', id],
    queryFn: async () => {
      if (!id) throw new Error('Post ID is missing')

      const response = await getPostById(id)
      if (!response || response.status !== 200) {
        throw new Error(`Failed to fetch post. Status: ${response?.status ?? 'unknown'}`)
      }

      return response.data
    },
    enabled: !!id, // only run if id exists
    staleTime: 1000 * 60, // 1 minute cache
  })

  return (
    <div className="bg-white p-4 mt-10 rounded-lg shadow-md border border-gray-200">
      <h1 className="text-xl font-bold mb-4">Post Details</h1>

      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error: {error.message}</div>}

      {post && (
        <div>
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="mt-2 text-gray-700">{post.body}</p>
        </div>
      )}
    </div>
  )
}

export default FetchRQDetails
