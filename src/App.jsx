import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MainLayout from './components/Layout/MainLayout'
import Home from './components/Layout/UI/Pages/Home'
import FetchOld from './components/Layout/UI/Pages/FetchOld'
import FetchRQ from './components/Layout/UI/Pages/FetchRQ'
import FetchRQDetails from './components/Layout/UI/FetchRQDetails'

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
  },
  {
    path: '/rq/:id',
    element: <FetchRQDetails/>
  }
  ]
}
])

const queryClient = new QueryClient()

const App = () => {
  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
    <ReactQueryDevtools initialIsOpen={false}/>
  </QueryClientProvider>
}

export default App
