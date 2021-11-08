import { Link, withRouter } from 'react-router-dom';
import { singOut, isAuthenticate, userInfo } from '../utils/auth';


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    }
    else {
        return { color: 'grey' }
    }
}

const Menu = ({ history }) => {
    return (
        <nav className='navbar navbar-light bg-light'>
            <ul className="nav nav-tabs" >
                <li className="nav-item">
                    <Link className="nav-link" to="/" style={isActive(history, '/')}>Home</Link>
                </li>
                {!isAuthenticate() && (<>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login" style={isActive(history, '/login')}>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register" style={isActive(history, '/register')}>Register</Link>
                    </li>
                </>)}
                {isAuthenticate() && (<>
                    <li className="nav-item">
                        <Link className="nav-link" to={`${userInfo().role}/dashboard`} style={isActive(history, `${userInfo().role}/dashboard`)}>Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link" style={{ cursor: 'pointer', color: 'grey' }} onClick={() => {
                            singOut(() => {
                                history.push('/login');
                            });
                        }}>Logout</span>
                    </li>
                </>)}

            </ul>
        </nav >
    )
}

export default withRouter(Menu);