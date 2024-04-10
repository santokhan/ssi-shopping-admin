import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import { useContext, useEffect } from 'react';
import DashboardContent from '../blocks/DashboardContent';

const Index = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const authorized = isAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authorized) {
      navigate('/signin');
    }
  }, [authorized, navigate]);

  return authorized && <DashboardContent />;
};

export default Index;
