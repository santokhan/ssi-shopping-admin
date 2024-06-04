import { useContext } from 'react';
import RecentActivities from '../blocks/activities/RecentActivities';
import StatusCard from '../blocks/status/StatusCard';
import { AuthContext } from '../context/auth-context';
import { jwtDecode } from 'jwt-decode';

const DashboardContent = () => {
  const { token } = useContext(AuthContext);
  const access = token?.access || '';
  const decoded = jwtDecode(access);

  return (
    <div className="">
      <div className="">
        <h3 className="text-3xl lg:text-4xl font-semibold text-gray-900 capitalize">
          Welcome,{' '}
          {decoded?.username && (
            <span title={decoded.email}>{decoded.username}</span>
          )}
        </h3>
        <p className="text-base text-gray-700 lg:mt-2 font-medium">
          We are glad to see you again!
        </p>
      </div>

      <StatusCard />
      <RecentActivities />
    </div>
  );
};

export default DashboardContent;
