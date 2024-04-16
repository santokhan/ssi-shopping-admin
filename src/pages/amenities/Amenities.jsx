import AmenitiesTable from '../../blocks/table/AmenitiesTable';
import * as Page from '../../components/page-header/PageHeader';
import AmenitiesProvider from '../../context/amenities/amenities-context';
import { Outlet } from 'react-router-dom';

const AmenitiesLayout = () => {
  return (
    <AmenitiesProvider>
      <div className="space-y-4">
        <Page.Top>
          <Page.Title>Amenities</Page.Title>
          <Page.Desc>Add or edit amenities</Page.Desc>
        </Page.Top>

        <div className="flex gap-6 flex-wrap items-start">
          <AmenitiesTable className="flex-grow lg:flex-1" />
          <div className="flex-grow lg:flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </AmenitiesProvider>
  );
};

export default AmenitiesLayout;
