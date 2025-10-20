import axios from 'axios'

 const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const getPosts = async () => {
    const response = await apiClient.get('/posts')
    return response
}

