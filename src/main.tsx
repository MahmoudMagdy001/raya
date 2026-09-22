import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { initArabicNumeralsObserver } from './lib/arabicNumerals'

// تشغيل نظام تحويل الأرقام التلقائي للأرقام العربية
initArabicNumeralsObserver()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
