import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {NextUIProvider} from '@nextui-org/react'
import AuthContextProvider from './context/AuthContext.jsx'
// import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <NextUIProvider>
          <AuthContextProvider>

              <App />
          </AuthContextProvider>
        </NextUIProvider>
  </StrictMode>,
)
