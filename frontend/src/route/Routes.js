import React from "react";
import {Core} from "../helpers/api/core";
import {Navigate, Route, Routes} from "react-router-dom";
import {authProtectedFlattenRoutes, publicProtectedFlattenRoutes} from "./index";
import {Layout as LayoutNoSidebar} from "../layout/NoSidebar";
import {RouteProps} from "react-router-dom";
import Layout from "../layout";

const AllRoutes = (props: RouteProps) => {
    const api = new Core();
    return (
        <React.Fragment>
            <Routes>
                <Route>
                    {publicProtectedFlattenRoutes.map((route, idx) => (
                        <Route
                            key={idx}
                            path={route.path}
                            element={
                                <LayoutNoSidebar {...props}>
                                    {route.element}
                                </LayoutNoSidebar>
                            }
                        />
                    ))}
                </Route>
                <Route>
                    {authProtectedFlattenRoutes.map((route, idx) => (
                        <Route
                            key={idx}
                            path={route.path}
                            element={
                                api.isUserAuthenticated() === false
                                    ? (<Navigate to={{pathname: '/masuk'}}/>)
                                    : (<Layout {...props}>{route.element}</Layout>)
                            }/>
                    ))}
                </Route>
            </Routes>
        </React.Fragment>
    );
}
export default AllRoutes;