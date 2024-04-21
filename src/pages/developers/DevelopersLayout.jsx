import * as Page from '../../components/page-header/PageHeader';
import { Outlet } from 'react-router-dom';
import FeaturesProvider from '../../context/features/features-context';
import DevelopersTable from '../../blocks/table/DevelopersTable';
import DevelopersProvider from '../../context/developers/developers-context';

const DevelopersLayout = () => {
  return (
    <DevelopersProvider>
      <div className="space-y-4">
        <Page.Top>
          <Page.Title>Developers</Page.Title>
          {/* <Page.Desc>Add or edit locations</Page.Desc> */}
        </Page.Top>

        <div className="flex gap-6 flex-wrap items-start">
          <DevelopersTable className="flex-grow lg:flex-1" />
          <div className="flex-grow lg:flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </DevelopersProvider>
  );
};

export default DevelopersLayout;
