import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './home/Home';
import Dashboard from './user/Dashboard';
import Login from './user/Login';
import Register from './user/Register';
import PrivateRoute from '../components/protected/PrivateRoute'
import AdminRoute from '../components/protected/AdminRoute';
import AdminDashboard from './admin/AdminDashboard';
import CreateCategory from './admin/CreateCategory';
import CreateProduct from './admin/CreateProduct';
import ProductDetails from './home/ProductDetails';
import Cart from './order/Cart';

const Main = () => {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/product/:id" exact component={ProductDetails} />
                <PrivateRoute path="/user/dashboard">
                    <Dashboard />
                </PrivateRoute>
                <PrivateRoute path="/cart">
                    <Cart />
                </PrivateRoute>
                <AdminRoute path="/admin/dashboard">
                    <AdminDashboard />
                </AdminRoute>
                <AdminRoute path="/admin/create/category">
                    <CreateCategory />
                </AdminRoute>
                <AdminRoute path="/admin/create/product">
                    <CreateProduct />
                </AdminRoute>
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default Main;