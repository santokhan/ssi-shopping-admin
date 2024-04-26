import * as Page from '../../components/page-header/PageHeader';
import EnquiriesTable from '../../blocks/table/EnquiriesTable';
import EnquiriesProvider from '../../context/enquiries/enquiries-context';
import DownloadButton from '../../components/form/DownloadButton';

const EnquiriesLayout = () => {
  return (
    <EnquiriesProvider>
      <div className="space-y-4">
        <Page.Top className="flex justify-between">
          <div className="">
            <Page.Title>Enquiries</Page.Title>
            {/* <Page.Desc>Add or edit enquiries</Page.Desc> */}
          </div>
          <div className="">
            <DownloadButton />
          </div>
        </Page.Top>

        <div className="flex gap-6 flex-wrap items-start">
          <EnquiriesTable className="flex-grow lg:flex-1" />
        </div>
      </div>
    </EnquiriesProvider>
  );
};

export default EnquiriesLayout;
