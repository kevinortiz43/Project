import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      {/* REVIEW: Unnecessary fragment wrapper — use <App /> directly */}
      <App></App>
    </>
  </StrictMode>
);
