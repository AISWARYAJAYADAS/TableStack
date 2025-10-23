import axios, { AxiosResponse } from 'axios'

// Create Axios instance
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

// Type for a post
export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

// Fetch all posts
// export const getPosts = async (): Promise<AxiosResponse<Post[]>> => {
//   const response = await apiClient.get<Post[]>('/posts')
//   return response
// }
export const getPosts = async (pageNumber: number, limit = 3): Promise<AxiosResponse<Post[]>> => {
  const response = await apiClient.get<Post[]>(`/posts?_start=${pageNumber}&_limit=${limit}`)
  return response
}

// Fetch post by ID
export const getPostById = async (id: number | string): Promise<AxiosResponse<Post> | null> => {
  try {
    const response = await apiClient.get<Post>(`/posts/${id}`)
    return response
  } catch (error) {
    console.error(error)
    return null
  }
}
