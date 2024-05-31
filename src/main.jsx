import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
//conseguir action y operacion para store
import operacion from './reducer/operacion';
import { Provider } from 'react-redux';

//crear store de reducx para enviar los ptos de resto de la producto a navbar
const myStore=createStore(operacion);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={myStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
