import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import { useNavigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
  const { isAuthenticated, signout } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(isAuthenticated);

  if (!isAuthenticated) {
    signout();
    navigate('/signin');
  } else {
    return children;
  }
};

export default PrivateRoutes;
