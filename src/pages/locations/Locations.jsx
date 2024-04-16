import * as Page from '../../components/page-header/PageHeader';
import { Outlet } from 'react-router-dom';
import LocationsProvider from '../../context/locations/locations-context';
import LocationsTable from '../../blocks/table/LocationsTable';

const LocationsLayout = () => {
  return (
    <LocationsProvider>
      <div className="space-y-4">
        <Page.Top>
          <Page.Title>Locations</Page.Title>
          <Page.Desc>Add or edit locations</Page.Desc>
        </Page.Top>

        <div className="flex gap-6 flex-wrap items-start">
          <LocationsTable className="flex-grow lg:flex-1" />
          <div className="flex-grow lg:flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </LocationsProvider>
  );
};

export default LocationsLayout;
