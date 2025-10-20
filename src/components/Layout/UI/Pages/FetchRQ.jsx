import React from 'react'
import { useQuery } from '@tanstack/react-query'
// Assuming getPosts is correctly imported
import { getPosts } from '../../../../API/api' 

// Simplified and robust query function
const getPostData = async () => {
    // Assume getPosts returns the full Axios response object
    const response = await getPosts();
    
    if (response.status !== 200) {
        // TanStack Query will catch this thrown error and set the 'error' state.
        throw new Error(`Failed to fetch posts. Status: ${response.status}`);
    }
    
    // Return the actual data array
    return response.data;
}

const FetchRQ = () => {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: getPostData,
        // Optional: time settings for better performance
        staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    })

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">FetchRQ (React Query)</h1>
            
            {/* 1. Show Loading State */}
            {isLoading && (
                <div className="text-blue-500 font-medium">Loading posts...</div>
            )}
            
            {/* 2. Show Error State */}
            {error && (
                <div className="text-red-500 font-medium">Error: {error.message}</div>
            )}

            {/* 3. Show Data State */}
            <div className="space-y-4">
                {/* 'posts' is now the array of data directly */}
                {/* Use optional chaining and check if it's an array for safety */}
                {Array.isArray(posts) && posts.length > 0 && posts.map((post) => {
                    const { id, title, body } = post
                    return (
                        <div key={id} className="p-4 border rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold text-indigo-900">{title}</h2>
                            <p className="text-sm text-gray-600">{body.substring(0, 100)}...</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FetchRQ