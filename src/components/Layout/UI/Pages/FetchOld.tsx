import React, { useEffect, useState } from 'react'
import { getPosts, Post } from '@/API/api'

const FetchOld: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [pageNumber, setPageNumber] = useState(0);
  const limit = 3;
  const fetchPosts = async (pageNumber: number): Promise<void> => {
    try {
      setLoading(true)
      setError(null)

      const response = await getPosts(pageNumber, limit)
      if (response.status === 200) {
        setPosts(response.data)
      } else {
        setPosts([])
      }
    } catch (err) {
      setError(err as Error)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }
  const isLastPage = posts && posts.length < limit;

  useEffect(() => {
    fetchPosts(pageNumber)
  }, [pageNumber])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Fetch Old</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg shadow-sm">
            <span className="text-sm text-gray-600">{post.id}</span>
            <h2 className="text-lg font-semibold text-indigo-600">{post.title}</h2>
            <p className="text-sm text-gray-600">{post.body.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error: {error.message}</div>}
      <div className="flex align-bottom justify-end gap-4">
        <button onClick={() => setPageNumber(pageNumber - limit)} disabled={pageNumber === 0}>Previous</button>
        <span className="text-lg font-medium">{Math.floor(pageNumber / limit) + 1}</span>
        <button onClick={() => setPageNumber(pageNumber + limit)} disabled={isLastPage}>Next</button>
      </div>
    </div>
  )
}

export default FetchOld
