import React from "react";
import {Route, RouteProps} from "react-router-dom";
import PrivateRoute from "@/routes/PrivateRoute.tsx";

const Dashboard = React.lazy(() => import('../pages/dashboard'));

const Login = React.lazy(() => import('../pages/auth/Login'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const RecoverPassword = React.lazy(() => import('../pages/auth/RecoverPassword'));

const Error404 = React.lazy(() => import('../pages/error/Error404'));
const Error500 = React.lazy(() => import('../pages/error/Error500'));


export interface RoutesProps {
    path: RouteProps['path']
    name?: string
    element?: RouteProps['element']
    route?: any
    exact?: boolean
    icon?: string
    header?: string
    roles?: string[]
    children?: RoutesProps[]
}

const dashboardRoutes: RoutesProps = {
    path: '/dashboard',
    name: 'Dashboards',
    icon: 'home',
    children: [
        {
            path: '/',
            name: 'Dashboard',
            element: <Dashboard/>,
            route: PrivateRoute,
        },
    ],
}
// auth
const authRoutes: RoutesProps[] = [
    {
        path: '/auth/login',
        name: 'Login',
        element: <Login/>,
        route: Route,
    },
    {
        path: '/auth/register',
        name: 'Register',
        element: <Register/>,
        route: Route,
    },
    {
        path: '/auth/logout',
        name: 'Logout',
        element: <Logout/>,
        route: Route,
    },
    {
        path: '/auth/recover-password',
        name: 'Recover Password',
        element: <RecoverPassword/>,
        route: Route,
    }
]

const otherPublicRoutes = [
    {
        path: '*',
        name: 'Error - 404',
        element: <Error404/>,
        route: Route,
    },
    {
        path: '/error-404',
        name: 'Error - 404',
        element: <Error404/>,
        route: Route,
    },
    {
        path: '/error-500',
        name: 'Error - 500',
        element: <Error500/>,
        route: Route,
    }
]
// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
    let flatRoutes: RoutesProps[] = []

    routes = routes || []
    routes.forEach((item: RoutesProps) => {
        flatRoutes.push(item)
        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)]
        }
    })
    return flatRoutes
}

// All routes
const authProtectedRoutes = [dashboardRoutes]
const publicRoutes = [...authRoutes, ...otherPublicRoutes]

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes])
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes])
export {publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes}