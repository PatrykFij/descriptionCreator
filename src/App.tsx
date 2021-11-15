import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'context/AuthProvider/AuthProvider';
import ToastProvider from 'context/ToastProvider';
import { AppProvider } from './context/AppContext/AppContext';
import routes from './routes/routes';
import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider />
        <AppProvider>{routes}</AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
