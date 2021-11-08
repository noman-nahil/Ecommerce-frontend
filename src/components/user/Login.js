import { useState } from 'react';
import Layout from '../Layout';
import { showError, showLoading } from '../../utils/messages';
import { login } from '../../api/apiAuth';
import { Redirect } from 'react-router-dom';
import { authenticate } from '../../utils/auth';


const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: false,
        loading: false,
        disabled: false,
        redirect: false
    });

    const { email, password, loading, error, redirect, disabled } = values;
    const handleChange = e => {
        setValues({
            ...values,
            error: false,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault();
        setValues({
            ...values,
            error: false,
            loading: true,
            disabled: true
        });
        login({ email, password })
            .then(response => {
                authenticate(response.data.token, () => {
                    setValues({
                        email: '',
                        password: '',
                        error: false,
                        loading: false,
                        disabled: false,
                        success: true,
                        redirect: true
                    })
                });
            })
            .catch(err => {
                let errMsg = 'Something went wrong'
                if (err.response) {
                    errMsg = err.response.data;
                    console.log(errMsg)
                }
                else {
                    errMsg = 'Something went wrong'
                }
                setValues({ ...values, error: errMsg, disabled: false, loading: false })
            })
    }
    const signInForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Email:</label>
                <input name='email' type="email" className="form-control"
                    value={email} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label className="text-muted">Password:</label>
                <input name="password" type="password" className="form-control"
                    value={password} required onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-outline-primary" disabled={disabled}>Login</button>
        </form>
    );
    const redirectUser = () => {
        if (redirect) return <Redirect to="/" />

    }
    return (
        <Layout title="Login Page" className="container col-md-8 offset-md-2">
            {redirectUser()}
            {showLoading(loading)}
            {showError(error, error)}
            <h3>Login Here,</h3>
            <hr />
            {signInForm()}
            <hr />
        </Layout>
    );
}

export default Login;