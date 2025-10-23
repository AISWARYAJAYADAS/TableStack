import {  RouterProvider } from 'react-router'
import { AppProviders } from './main/providers/AppProviders'
import { router } from './main/AppRouter'

const App = () => {
  return (
    <AppProviders>
      <RouterProvider router={router}/>
    </AppProviders>
  )
}

export default App