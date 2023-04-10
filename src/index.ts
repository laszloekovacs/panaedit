import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/App'
import './index.scss'

/* react enrty point */
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(React.createElement(App))
