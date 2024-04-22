import * as Page from '../../components/page-header/PageHeader';
import { Outlet } from 'react-router-dom';
import FeaturesProvider from '../../context/features/features-context';
import FeaturesTable from '../../blocks/table/FeaturesTable';

const FeaturesLayout = () => {
  return (
    <FeaturesProvider>
      <div className="space-y-4">
        <Page.Top>
          <Page.Title>Features</Page.Title>
          {/* <Page.Desc>Add or edit locations</Page.Desc> */}
        </Page.Top>

        <div className="flex gap-6 flex-wrap items-start">
          <FeaturesTable className="flex-grow lg:flex-1" />
          <div className="flex-grow lg:flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </FeaturesProvider>
  );
};

export default FeaturesLayout;
