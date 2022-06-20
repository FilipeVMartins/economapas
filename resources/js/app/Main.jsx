import React from 'react';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import PageContextProvider from './PageContextProvider';
import { PageContext } from './PageContextProvider';

//pages
import Login from './pages/Login';
import Home from './pages/Home';

//style
import './styles.css';

export default function Main () {

    return (
        <div className="Main">
            <PageContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" exact={true} element={<Login />}/>
                        <Route path="/Home" exact={true} element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </PageContextProvider>
        </div>
    );
}

if (document.getElementById('app-root')) {
    ReactDOM.render(
        <React.StrictMode>
            <Main />
            <ToastContainer
                autoClose={10000}
                style={{ width: "30rem", maxWidth:"100%"}}
                theme="colored"
            />
        </React.StrictMode>,
        document.getElementById('app-root')
    );
}