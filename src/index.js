import App from './App'
import { AuthProvider } from './hooks/useAuth'
import { ErrorModalProvider } from './hooks/useErrorModal'
import { FeaturesProvider } from './hooks/useFeatures'
import './index.css'
import reportWebVitals from './reportWebVitals'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <AuthProvider>
      <FeaturesProvider>
        <ErrorModalProvider>
          <App />
        </ErrorModalProvider>
      </FeaturesProvider>
    </AuthProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
