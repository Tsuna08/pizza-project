import { createBrowserRouter } from 'react-router-dom'
import { Card, ErrorPage, Menu } from '@/pages'
import { Layout } from '@/layout/Layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Menu /> },
      { path: '/card', element: <Card /> }
    ]
  }
])
