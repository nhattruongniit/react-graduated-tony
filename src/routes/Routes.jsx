import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// configs
import { PATH_NAME } from 'configs';

// layouts
import MainLayout from 'layouts/MainLayout';

// guards
import AuthGuard from 'guards/AuthGuard';
import GuestGuard from 'guards/GuestGuard';

// pages
const Dashboard = lazy(() => import('pages/Dashboard'));
const Login = lazy(() => import('pages/Login'));
const User = lazy(() => import('pages/User'));

const routes = [
  {
    path: PATH_NAME.ROOT,
    element: () => <Navigate to="/dashboard" />,
  },
  {
    path: PATH_NAME.LOGIN,
    element: Login,
    guard: GuestGuard
  },
  {
    path: PATH_NAME.DASHBOARD,
    element: Dashboard,
    layout: MainLayout,
    guard: AuthGuard
  },
  {
    path: PATH_NAME.USER,
    element: User,
    layout: MainLayout,
    guard: AuthGuard
  },
  {
    path: '*',
    element: () => <div>not found</div>
  }
]

function RoutesMain() {
  return (
    <>
      <Router>
        <Suspense fallback={<div />}>
          <Routes>
            {routes.map((routeItem, routeIndex) => {
              const Component = routeItem.element;
              const Layout = routeItem.layout || Fragment;
              const Guard = routeItem.guard || Fragment;

              return (
                <Route 
                  key={routeIndex}
                  path={routeItem.path}
                  element={
                    <Guard>
                      <Layout>
                        <Component />
                      </Layout>
                    </Guard>
                  }
                />
              )
            })}
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default RoutesMain