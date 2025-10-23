import React,{useState} from 'react'
import { useQuery,keepPreviousData } from '@tanstack/react-query'
import { NavLink } from 'react-router'
import { getPosts, Post } from '@/API/api'

const FetchRQ: React.FC = () => {

  const [pageIndex, setPageIndex] = useState(0);
  const limit = 3;


  const fetchPosts = async (pageIndex: number): Promise<Post[]> => {
      const response = await getPosts(pageIndex, limit)
      if (response.status !== 200) {
        throw new Error(`Failed to fetch posts. Status: ${response.status}`)
      }
      return response.data
    }

  // React Query for fetching posts
  const { data: posts, isLoading, error } = useQuery<Post[], Error>({
    queryKey: ['posts', pageIndex],
    queryFn: () => fetchPosts(pageIndex),
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    placeholderData: keepPreviousData,
  })

    const isLastPage = posts && posts.length < limit; // if the number of posts is less than the limit, then it is the last page

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">FetchRQ (React Query)</h1>

      {isLoading && <div className="text-blue-500 font-medium">Loading posts...</div>}

      {error && <div className="text-red-500 font-medium">Error: {error.message}</div>}

      <div className="space-y-4">
        {Array.isArray(posts) && posts.length > 0 && posts.map((post) => (
          <NavLink key={post.id} to={`/rq/${post.id}`}>
            <div className="p-4 border rounded-lg shadow-md border-gray-200">
              <span className="text-sm text-gray-600">{post.id}</span>
              <h2 className="text-lg font-semibold text-indigo-900">{post.title}</h2>
              <p className="text-sm text-gray-600">{post.body.substring(0, 100)}...</p>
            </div>
          </NavLink>
        ))}
      </div>

      <div className="flex align-bottom justify-end gap-4">
        <button onClick={() => setPageIndex(pageIndex - limit)} disabled={pageIndex === 0}>Previous</button>
        <span className="text-lg font-medium">{Math.floor(pageIndex / limit) + 1}</span>
        <button onClick={() => setPageIndex(pageIndex + limit)}disabled={isLastPage}>Next</button>
      </div>
    </div>
  )
}

export default FetchRQ
