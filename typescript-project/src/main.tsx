import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarContextProvider } from './components/Snackbar/SnackbarContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <SnackbarContextProvider>
      <App />
    </SnackbarContextProvider>
  </BrowserRouter>
);
