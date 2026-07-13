import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'
import './styles/ref.css'

function setTimeClass() {
  const hour = new Date().getHours()
  let timeClass = 'time-morning'
  if (hour >= 12 && hour < 18) {
    timeClass = 'time-afternoon'
  } else if (hour >= 18 || hour < 6) {
    timeClass = 'time-evening'
  }
  document.documentElement.className = timeClass
}

setTimeClass()
setInterval(setTimeClass, 60000)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
