import axios from 'axios';
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Loader } from '@/components';
import { PREFIX } from '@/helpers/api';
import { RequireAuth } from '@/helpers/requireAuth';
import { AuthLayout } from '@/layout/AuthLayout';
import { Layout } from '@/layout/Layout';
import { routers } from '@/routers';

const ErrorPage = lazy(() => import('@/pages/ErrorPage/ui/ErrorPage'));
const Menu = lazy(() => import('@/pages/Menu/ui/Menu'));
const Cart = lazy(() => import('@/pages/Cart/ui/Cart'));
const Product = lazy(() => import('@/pages/Product/ui/Product'));
const Login = lazy(() => import('@/pages/Login/ui/Login'));
const Register = lazy(() => import('@/pages/Register/ui/Register'));
const SuccessOrder = lazy(() => import('@/pages/SuccessOrder/ui/SuccessOrder'));

export const router = createBrowserRouter([
  {
    path: routers.root,
    element: (
      <Suspense fallback={<Loader />}>
        <RequireAuth>
          <Layout />
        </RequireAuth>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: routers.root, element: <Menu /> },
      { path: routers.cart, element: <Cart /> },
      {
        path: routers.product,
        element: <Product />,
        loader: async ({ params }) => {
          const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          return data;
        }
      },
      { path: routers.successOrder, element: <SuccessOrder /> }
    ]
  },
  {
    path: routers.auth,
    element: (
      <Suspense fallback={<Loader />}>
        <AuthLayout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: routers.login, element: <Login /> },
      { path: routers.register, element: <Register /> }
    ]
  }
]);
