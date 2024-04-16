import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth-context';
import { useNavigate, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    console.log(`Private Route`, isAuthenticated);
    return <Navigate to="/signin" replace />;
  } else {
    return children;
  }
};

export default PrivateRoute;
