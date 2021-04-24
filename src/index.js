import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./redux/redux-store";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {Provider} from "react-redux";
import AppContainer from "./components/AppContainer";
import HttpsRedirect from 'react-https-redirect';


ReactDOM.render(
    <HttpsRedirect>
        <BrowserRouter>
            <React.StrictMode>
                <Provider store={store}>
                    <AppContainer/>
                </Provider>
            </React.StrictMode>
        </BrowserRouter>
    </HttpsRedirect>,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
