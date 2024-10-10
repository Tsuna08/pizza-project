import { Layout } from '@/layout/Layout'
import { Card, ErrorPage, Menu } from '@/pages'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Menu /> },
      { path: '/cart', element: <Card /> }
    ]
  }
])
