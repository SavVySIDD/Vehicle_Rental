import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { UserProvider } from './context/UserContext'; // ✅ Import UserProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> {/* ✅ Wrap the entire app */}
      <App />
    </UserProvider>
  </StrictMode>
);
