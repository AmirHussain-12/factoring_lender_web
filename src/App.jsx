import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Invoices from './components/Invoices';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import { AuthProvider } from './app/auth/AuthContext';
import ProtectedRoute from './app/auth/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="invoices" element={<Invoices headerText='My Invoices' />} />
              <Route path="invoice_requests" element={<Invoices headerText={'Invoice Requests'} />} />
            </Route>
            <Route path='login' element={<LoginForm headerText={'Sign In'} />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
