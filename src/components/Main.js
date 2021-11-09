import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './home/Home';
import Dashboard from './user/Dashboard';
import Login from './user/Login';
import Register from './user/Register';
import PrivateRoute from '../components/protected/PrivateRoute'
import AdminRoute from '../components/protected/AdminRoute';
import AdminDashboard from './admin/AdminDashboard';
import CreateCategory from './admin/CreateCategory';

const Main = () => {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <PrivateRoute path="/user/dashboard">
                    <Dashboard />
                </PrivateRoute>
                <AdminRoute path="/admin/dashboard">
                    <AdminDashboard />
                </AdminRoute>
                <AdminRoute path="/admin/create/category">
                    <CreateCategory />
                </AdminRoute>
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default Main;