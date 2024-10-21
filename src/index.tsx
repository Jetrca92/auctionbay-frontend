import 'styles/scss/index.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { OverlayProvider } from 'components/overlays/OverlayContext'

export const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <Router>
          <App />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
        </Router>
      </OverlayProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
