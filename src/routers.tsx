import { Loader } from '@/components';
import { PREFIX } from '@/helpers/api';
import { AuthLayout } from '@/layout/AuthLayout';
import { Layout } from '@/layout/Layout';
import axios from 'axios';
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const ErrorPage = lazy(() => import('@/pages/ErrorPage/ui/ErrorPage'));
const Menu = lazy(() => import('@/pages/Menu/ui/Menu'));
const Cart = lazy(() => import('@/pages/Cart/ui/Cart'));
const Product = lazy(() => import('@/pages/Product/ui/Product'));
const Login = lazy(() => import('@/pages/Login/ui/Login'));
const Register = lazy(() => import('@/pages/Register/ui/Register'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <Layout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Menu /> },
      { path: '/cart', element: <Cart /> },
      {
        path: '/product/:id',
        element: <Product />,
        loader: async ({ params }) => {
          const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          return data;
        }
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }
    ]
  }
]);
