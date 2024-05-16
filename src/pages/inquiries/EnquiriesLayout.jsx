import * as Page from '../../components/page-header/PageHeader';
import EnquiriesTable from '../../blocks/table/EnquiriesTable';
import EnquiriesProvider, {
  EnquiriesContext,
} from '../../context/enquiries/enquiries-context';
import DownloadButton from '../../components/form/DownloadButton';
import TableSearch from '../../blocks/table/TableSearch';
import { useContext, useState } from 'react';

const EnquiriesLayout = () => {
  const {
    state: enquiries,
    setPageNumber,
    page_size,
    refetch,
  } = useContext(EnquiriesContext);

  const [filtered, setFiltered] = useState(enquiries);

  function onSearch(needle) {
    if (needle && needle.length > 0) {
      setFiltered(
        enquiries.filter((_) => {
          const target = _.name.trim().toLowerCase();
          const value = needle.trim().toLowerCase();
          return target.includes(value);
        }),
      );
    }
  }

  return (
    <div className="space-y-4">
      <Page.Top className="flex justify-between">
        <div className="">
          <Page.Title>Enquiries</Page.Title>
          {/* <Page.Desc>Add or edit enquiries</Page.Desc> */}
        </div>
        <div className="flex items-center gap-4">
          <TableSearch onFilter={onSearch} />
          <DownloadButton />
        </div>
      </Page.Top>

      <div className="flex gap-6 flex-wrap items-start">
        <EnquiriesTable
          enquiries={filtered}
          setPageNumber={setPageNumber}
          page_size={page_size}
          refetch={refetch}
          className="flex-grow lg:flex-1"
        />
      </div>
    </div>
  );
};

export default EnquiriesLayout;
