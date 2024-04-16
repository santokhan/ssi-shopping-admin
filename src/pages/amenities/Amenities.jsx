import { useEffect, useState } from 'react';
import Spinner from '../../components/loader/Spinner';
import useAxios from '../../context/useAxios';
import AmenitiesTable from '../../blocks/table/AmenitiesTable';
import * as Page from '../../components/page-header/PageHeader';
import AmenitiesForm from '../../blocks/form/amenities/Amenities';
import AmenitiesProvider from '../../context/amenities/amenities-context';

const Amenities = () => {
  return (
    <AmenitiesProvider>
      <div className="space-y-4">
        <Page.Top>
          <Page.Title>Amenities</Page.Title>
          <Page.Desc>Add or edit amenities</Page.Desc>
        </Page.Top>

        <div className="flex gap-6 flex-wrap items-start">
          <AmenitiesTable className="flex-grow lg:flex-1" />
          <AmenitiesForm className="flex-grow lg:flex-1" />
        </div>
      </div>
    </AmenitiesProvider>
  );
};

export default Amenities;
