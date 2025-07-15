import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // 👉 thêm dòng này

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* 👉 bọc App trong BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);
