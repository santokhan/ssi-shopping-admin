import * as Page from '../../components/page-header/PageHeader';
import { Outlet } from 'react-router-dom';
import UsersTable from '../../blocks/table/UsersTable';
import UsersProvider from '../../context/users/UserContext';

const UsersLayout = () => {
  return (
    <UsersProvider>
      <div className="space-y-4">
        <Page.Top>
          <Page.Title>Users</Page.Title>
        </Page.Top>

        <div className="flex gap-6 flex-wrap items-start">
          <UsersTable className="flex-grow" />
          <div className="w-full max-w-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </UsersProvider>
  );
};

export default UsersLayout;
