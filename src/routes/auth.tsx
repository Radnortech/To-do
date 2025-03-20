import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import AuthForm from '../components/AuthForm'
import ProtectedLayout from '../components/ProtectedLayout'
import Header from '../components/Header'
import App from '../App'

export const authRouter = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        path: '/',
        element: (
          <>
            <Header />
            <App />
          </>
        )
      }
    ]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <AuthForm mode="login" />
      },
      {
        path: 'signup',
        element: <AuthForm mode="signup" />
      }
    ]
  }
])
