import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authActions } from '../store/index'
import { setLocalStorage } from '../services/authService';

function Login() {
    
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inputChangeHandler = (identifier, value) => {
        if (identifier === 'email') {
            setEmail(value)
        } else {
            setPassword(value)
        }
    }

    const loginHandler = (event) => {
        event.preventDefault();
        if (email === '' && password === '') {
        return;
        }
        setEmail('');
        setPassword('');

        setLocalStorage();
        dispatch(authActions.login());
        navigate('/');
    }

    return (
    <>
    <div className="row my-4">
            <form className="col-lg-6 mx-auto">
                <div className="row g-3">
                    <div className="col-6">
                        <div className="form-floating">
                            <input type="email" className="form-control" placeholder="Email" value={email} onChange={ (event) => inputChangeHandler('email', event.target.value) } />
                            <label >Email</label>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-floating">
                            <input type="password" className="form-control"  placeholder="Password" value={password} onChange={ (event) => inputChangeHandler('password', event.target.value) }  />
                            <label >Password</label>
                        </div>
                    </div>
                    <div className="col-12" style={{ display: 'flex', justifyContent: 'end' }}>
                        <button className="btn btn-primary me-2" onClick={loginHandler}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </>
    );
}
export default Login;
