import axios from 'axios'

 const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const getPosts = async () => {
    const response = await apiClient.get('/posts')
    return response
}

export const getPostById = async (id) => {
    try{
        const response = await apiClient.get(`/posts/${id}`)
        return response
    } catch(error){
        console.log(error)
        return null
    }
}

