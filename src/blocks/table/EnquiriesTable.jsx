import { Fragment, useContext } from 'react';
import ActionDelete from '../../components/action-buttons/Delete';
import ActionEdit from '../../components/action-buttons/Edit';
import Pagination from '../../components/table/pagination/Pagination';
import TableSummary from '../../components/table/agent/AgentDescFooter';
import useAxios from '../../context/useAxios';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { EnquiriesContext } from '../../context/enquiries/enquiries-context';

const EnquiriesTableAction = ({ enquiry, refetch }) => {
  const { api } = useAxios();
  const navigate = useNavigate();

  if (!enquiry) {
    return null;
  }

  function onEdit() {
    navigate(`/amenities/${enquiry.id}/edit`);
  }

  function onDelete() {
    api
      .delete(`amenities/${enquiry.id}/`)
      .then((res) => {
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex gap-3">
      <ActionEdit onEdit={onEdit} />
      <ActionDelete onDelete={onDelete} />
    </div>
  );
};

const EnquiriesTableRow = ({ enquiry, refetch }) => {
  if (!enquiry) {
    return null;
  } else {
    return (
      <tr className="border-b bg-white">
        <td className="px-6 py-4 font-medium text-gray-900">
          <h3 className="text-base font-semibold leading-relaxed">
            {enquiry.name}
          </h3>
        </td>
        <td className="px-6 py-4">{enquiry.email}</td>
        <td className="px-6 py-4">{enquiry.phone}</td>
        <td className="px-6 py-4">{enquiry.property}</td>
        <td className="px-6 py-4">{enquiry.status}</td>
        <td className="px-6 py-4">{enquiry.date}</td>
      </tr>
    );
  }
};

const EnquiriesTable = ({ className = '' }) => {
  const {
    state: enquiries,
    setPageNumber,
    page_size,
    refetch,
  } = useContext(EnquiriesContext);

  const headList = ['name', 'email', 'phone', 'property', 'status', 'date'];

  console.log(enquiries);

  if (!enquiries) {
    return null;
  } else {
    return (
      <>
        {enquiries.length > 0 ? (
          <div
            className={twMerge(
              className,
              'bg-white p-4 space-y-4 overflow-x-auto',
            )}
          >
            <table className="w-full text-sm text-gray-500 rtl:text-right">
              <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-700">
                <tr>
                  <th scope="col" className="text-start rounded-l-lg px-6 py-3">
                    {headList[0]}
                  </th>
                  <th scope="col" className="text-start px-6 py-3">
                    {headList[1]}
                  </th>
                  <th scope="col" className="text-start px-6 py-3">
                    {headList[2]}
                  </th>
                  <th scope="col" className="text-start px-6 py-3">
                    {headList[3]}
                  </th>
                  <th scope="col" className="text-start px-6 py-3">
                    {headList[4]}
                  </th>
                  <th scope="col" className="text-start px-6 py-3">
                    {headList[5]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enquiry, i) => {
                  return (
                    <Fragment key={i}>
                      <EnquiriesTableRow enquiry={enquiry} refetch={refetch} />
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              totalPages={new Array(Math.ceil(enquiries.length / page_size))
                .fill()
                .map((_, i) => i + 1)}
              currentPage={1}
              setPageNumber={setPageNumber}
            />
            <TableSummary
              totalData={Math.ceil(enquiries.length / page_size)}
              dataPerPage={10}
            />
          </div>
        ) : (
          <p className={twMerge(className, 'p-4 bg-white rounded-lg')}>
            No locations found
          </p>
        )}
      </>
    );
  }
};

export default EnquiriesTable;
