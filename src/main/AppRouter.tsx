import { createBrowserRouter } from "react-router";
import LoginPage from "@/components/Layout/UI/Pages/LoginPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardPage from "@/components/Layout/UI/Pages/DashboardPage";
import MainLayout from "@/components/Layout/MainLayout";
import FetchOld from "@/components/Layout/UI/Pages/FetchOld";
import FetchRQ from "@/components/Layout/UI/Pages/FetchRQ";
import FetchRQDetails from "@/components/Layout/UI/FetchRQDetails";


export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute><DashboardPage /></ProtectedRoute>
      },
      {
        path: '/dashboard',
        element: <ProtectedRoute><DashboardPage /></ProtectedRoute>
      },
      {
        path: '/trad',
        element: <ProtectedRoute><FetchOld /></ProtectedRoute>
      },
      {
        path: '/rq',
        element: <ProtectedRoute><FetchRQ /></ProtectedRoute>
      },
      {
        path: '/rq/:id',
        element: <ProtectedRoute><FetchRQDetails /></ProtectedRoute>
      }
    ]
  }
]);
