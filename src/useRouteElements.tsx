import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductLists from './pages/ProductLists'
import LoginLayout from './layouts/Login'
import RegisterLayout from './layouts/Register'
import Login from './pages/Login'
import Register from './pages/Register'
import MainLayout from './components/MainLayout'
import Profile from './pages/Profile'
import { useContext } from 'react'
import { AppConText } from './context/app.context'
import { path } from './constants/path'
import ProductDetail from './pages/ProductDetail'

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppConText)
  console.log(isAuthenticated)
  
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppConText)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouteElements() {
  // chia routes:
  const routeElements = useRoutes([
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <ProductLists />
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <LoginLayout>
              <Login />
            </LoginLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])

  return routeElements
}
