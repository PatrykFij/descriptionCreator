import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'components/AuthProvider/AuthProvider';
import ToastProvider from 'components/ToastProvider';
import { AppProvider } from './components/AppContext/AppContext';
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
