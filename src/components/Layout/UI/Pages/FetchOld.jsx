import React, { useEffect, useState } from 'react'
import { getPosts } from '../../../../API/api'
const FetchOld = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPostData = async () => {
       try{
        setLoading(true)
        setError(null)
        const response = await getPosts()
        const data = response.data
        console.log(data)
        response.status === 200 ? setPosts(data) : setPosts([])
       } catch (error) {
        setError(error)
        console.log(error)
        setPosts([])
       } finally {
        setLoading(false)
       }
    }

    useEffect(() => {
        getPostData()

    } ,[])

  return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Fetch Old</h1>
            <div className="space-y-4">

            {posts?.length > 0 && posts.map((post) => {
                const {id, title, body} = post
                return (
                       <div key={id} className="p-4 border rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold text-indigo-600">{title}</h2>
                            <p className="text-sm text-gray-600">{body.substring(0, 100)}...</p>
                        </div>
                )
            }
            )}
        </div>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
    </div>
  )
}

export default FetchOld