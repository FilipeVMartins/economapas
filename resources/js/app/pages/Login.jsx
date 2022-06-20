import React from 'react';
import { Navigate } from 'react-router';
import { PageContext } from '../PageContextProvider';
import { toast } from 'react-toastify';

function Login() {

    //PageContextProvider
    const { access_token } = React.useContext(PageContext);
    const { setAccess_token } = React.useContext(PageContext);
    const { setUser } = React.useContext(PageContext);
    
    // login form
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    //login error state
    const [loginError, setLoginError] = React.useState(false);

    const handleUserName = (e) => {
        setUserName(e.target.value);
        setLoginError(false);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setLoginError(false);
    }

    const login = () => {
        return new Promise((resolve, reject) => {
            showLoadingSpinner();

            let body = {
                name: userName,
                password: password,
            };

            body = JSON.stringify(body);

            let requestOptions = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    //'Authorization': `Bearer ${document.querySelector('meta[name="api-token"]').content}`
                },
                body:body
            };
        
            fetch(`/api/login`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if(result.access_token) {
                        toast.success('Login realizado!');
                        setUser(result.user);
                        setAccess_token(result.access_token);
                    } else {
                        toast.error('Erro ao realizar login! ')
                        console.log(JSON.stringify(result));
                        setLoginError(true);
                    }

                    hideLoadingSpinner();
                    resolve(result);
                })
                .catch(error => {
                    toast.error('Erro ao logar')
                    console.log(JSON.stringify(error));
                    reject('Erro ao logar: ' , error)
                });
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        showLoadingSpinner();
        login();
    };
    
    return (
        <div className="container">
            {access_token ? <Navigate to="/Home" replace={true} /> : ''}

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Teste Economapas</div>

                        <div className="card-body">
                            <form method="POST" onSubmit={handleLogin}>
                                <div className="row mb-3">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Usuário:</label>

                                    <div className="col-md-6">
                                        <input id="name" onChange={handleUserName} type="text" className={`form-control ${loginError ? "is-invalid" : ""}`} name="name" required autoComplete="email" autoFocus />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-end">Senha:</label>

                                    <div className="col-md-6">
                                        <input id="password" onChange={handlePassword} type="password" className={`form-control ${loginError ? "is-invalid" : ""}`} name="password" required autoComplete="current-password" />
                                    </div>
                                </div>

                                <div className="row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <button type="submit" onClick={handleLogin} className="btn btn-primary">
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;