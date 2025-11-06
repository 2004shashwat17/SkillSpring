import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import ErrorBoundary from './ErrorBoundary'
import './styles.css'
import { isClerkEnabled, PUBLISHABLE_KEY } from './clerkConfig'
import { ClerkProvider } from '@clerk/clerk-react'

const Root = (
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>
)

if (isClerkEnabled) {
  // Use ClerkProvider only when the publishable key looks valid
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <ErrorBoundary>
          <HashRouter>
            <App />
          </HashRouter>
        </ErrorBoundary>
      </ClerkProvider>
    </React.StrictMode>
  )
} else {
  console.warn('Clerk disabled: set VITE_CLERK_PUBLISHABLE_KEY in .env.local to enable auth')
  createRoot(document.getElementById('root')).render(Root)
}
