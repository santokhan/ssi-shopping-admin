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
          {/* <Page.Desc>Add or edit locations</Page.Desc> */}
        </Page.Top>

        <div className="flex gap-6 flex-wrap items-start">
          <UsersTable className="flex-grow lg:flex-1" />
          <div className="flex-grow lg:flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </UsersProvider>
  );
};

export default UsersLayout;
