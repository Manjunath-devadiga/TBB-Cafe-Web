<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
=======
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById('root')).render(
 <Provider store={store}>
    <App />
  </Provider>
>>>>>>> kailash-CafeWebsite-25/05/2026
)
