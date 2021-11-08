import { Route, Redirect } from "react-router-dom";
import { isAuthenticate, userInfo } from "../../utils/auth";


const AdminRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                (isAuthenticate() && userInfo().role === 'admin') ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default AdminRoute;