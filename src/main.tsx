import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ThemeProviderCustom from './components/ThemeProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProviderCustom>
            <App />
        </ThemeProviderCustom>
    </React.StrictMode>
)
