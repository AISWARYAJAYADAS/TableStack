import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MainLayout from './components/Layout/MainLayout'
import Home from './components/Layout/UI/Pages/Home'
import FetchOld from './components/Layout/UI/Pages/FetchOld'
import FetchRQ from './components/Layout/UI/Pages/FetchRQ'

// create a router setup
const router = createBrowserRouter([
{
  path: '/',
  element : <MainLayout/>,
  children : [
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/trad',
    element: <FetchOld/>
  },
  {
    path:'/rq',
    element: <FetchRQ/>
  }
  ]
}
])

const queryClient = new QueryClient()

const App = () => {
  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
  </QueryClientProvider>
}

export default App
