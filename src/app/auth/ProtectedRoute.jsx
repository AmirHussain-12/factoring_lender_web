import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(!isAuthenticated) {
    return <Navigate to='/login' replace/>
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;