import {Core} from "../helpers/api/core";
import {Navigate, Route} from "react-router-dom";
import {RouteProps} from "react-router-dom";

const PrivateRoute = ({component: Component, roles, ...rest}) => {
    const api = new Core();
    return (
        <Route
            {...rest}
            render={(props: RouteProps) => {
                if (api.isUserAuthenticated() === false) {
                    return (
                        <Navigate to={{pathname: "/masuk"}}/>
                    )
                }
                const loggedInUser = api.getLoggedInUser();
                if (roles && roles.indexOf(loggedInUser) === -1) {
                    return <Navigate to={{pathname: '/'}}/>
                }
                return <Component {...props}/>
            }}/>
    )
}
export default PrivateRoute;