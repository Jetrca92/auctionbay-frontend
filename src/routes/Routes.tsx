import { FC, lazy, Suspense } from 'react'
import { Route, RouteProps, Routes as Switch } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import RestrictedRoute from './RestrictedRoute'
import Login from 'pages/Login'
import Register from 'pages/Register'
import ForgotPassword from 'pages/ForgotPassword'
import Profile from 'pages/Profile'
import Bidding from 'pages/Bidding'
import Won from 'pages/Won'
import Auctions from 'pages/Auctions'
import Auction from 'pages/Auction'

export enum RouteType {
  PUBLIC,
  PRIVATE,
  RESTRICTED,
}

type AppRoute = RouteProps & {
  type?: RouteType
}

/* Public routes */
const LandingPage = lazy(() => import('pages/LandingPage'))

/* Private routes */

/* Restricted routes */

/* Error routes */
const Page404 = lazy(() => import('pages/Page404'))

export const AppRoutes: AppRoute[] = [
  // Restricted Routes
  {
    type: RouteType.PUBLIC,
    path: '/login',
    children: <Login />,
  },
  {
    type: RouteType.PUBLIC,
    path: '/signup',
    children: <Register />,
  },
  // Public Routes
  {
    type: RouteType.PUBLIC,
    path: '/',
    children: <LandingPage />,
  },
  {
    type: RouteType.PUBLIC,
    path: '/forgot-password',
    children: <ForgotPassword />,
  },
  // Private Routes
  {
    type: RouteType.PRIVATE,
    path: '/profile',
    children: <Profile />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/profile-bidding',
    children: <Bidding />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/profile-won',
    children: <Won />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/auctions',
    children: <Auctions />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/auction/:id',
    children: <Auction />,
  },
]

interface RoutesProps {
  isOverlayVisible: boolean
  toggleOverlay: () => void
}

const Routes: FC<RoutesProps> = ({ isOverlayVisible, toggleOverlay }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {AppRoutes.map((r) => {
          const { type } = r
          if (type === RouteType.PRIVATE) {
            return (
              <Route
                key={`${r.path}`}
                path={`${r.path}`}
                element={<PrivateRoute>{r.children}</PrivateRoute>}
              />
            )
          }
          if (type === RouteType.RESTRICTED) {
            return (
              <Route
                key={`${r.path}`}
                path={`${r.path}`}
                element={<RestrictedRoute>{r.children}</RestrictedRoute>}
              />
            )
          }

          return (
            <Route key={`${r.path}`} path={`${r.path}`} element={r.children} />
          )
        })}
        <Route path="*" element={<Page404 />} />
      </Switch>
    </Suspense>
  )
}

export default Routes
