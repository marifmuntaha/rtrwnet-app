import React from "react";
import {Route, RouteProps} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const Dashboard = React.lazy(() => import("../pages/dashboard"));
const Account = React.lazy(() => import("../pages/master/account"));
const Login = React.lazy(() => import("../pages/auth/Login"));
const Register = React.lazy(() => import("../pages/auth/Register"));
const Reset = React.lazy(() => import("../pages/auth/Reset"));
const Error404 = React.lazy(() => import("../pages/error/Error404"));
const Error504 = React.lazy(() => import("../pages/error/Error504"));

const appRoutes: RouteProps = {
    path: '/',
    name: 'Dashboard',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'home',
    element: <Dashboard />,
}
const masterRoutes: RouteProps = {
    path: '/master',
    name: 'Master',
    children: {
        path: '/master/rekening',
        name: 'Rekening',
        element: <Account/>,
        route: PrivateRoute,
    }
}

const authRoutes: RouteProps[] = [
    {
        path: '/masuk',
        name: 'Login',
        element: <Login />,
        route: Route,
    },
    {
        path: '/pendaftaran',
        name: 'Daftar',
        element: <Register />,
        route: Route,
    },
    {
        path: '/reset-sandi',
        name: 'Reset Password',
        element: <Reset />,
        route: Route,
    },
]

const otherPublicRoutes = [
    {
        path: '*',
        name: 'Error - 404',
        element: <Error404 />,
        route: Route,
    },
    {
        path: '/error-404',
        name: 'Error - 404',
        element: <Error404 />,
        route: Route,
    },
    {
        path: '/error-504',
        name: 'Error - 504',
        element: <Error504 />,
        route: Route,
    },
]

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

const authProtectedRoutes = [appRoutes, masterRoutes]
const publicRoutes = [...authRoutes, ...otherPublicRoutes]

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes])
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes])
export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes }