import { Fragment, useContext, useState } from 'react';
import ActionDelete from '../../components/action-buttons/Delete';
import Pagination from '../../components/table/pagination/Pagination';
import TableSummary from '../../components/table/agent/AgentDescFooter';
import useAxios from '../../context/useAxios';
import { Link, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { EnquiriesContext } from '../../context/enquiries/enquiries-context';
import formatDate from '../../utils/formatDate';

const EnquiriesTableAction = ({ id, refetch }) => {
  const { api } = useAxios();
  const navigate = useNavigate();

  function onEdit() {
    navigate(`/enquiries/${id}/edit`);
  }

  function onDelete() {
    api
      .delete(`enquiries/${id}/`)
      .then((res) => {
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (!id) {
    return null;
  } else {
    return (
      <div className="flex gap-3">
        {/* <ActionEdit onEdit={onEdit} /> */}
        <ActionDelete onDelete={onDelete} />
      </div>
    );
  }
};

import React from 'react';
import { CloseSquare, Edit, TickSquare } from 'iconsax-react';
import EnquiryStatusProvider, {
  EnquiryStatusContext,
} from '../../context/enquiries/EnquiryStatusContext';

const EnquiryStatus = ({ status, id }) => {
  const { statusFormIndex, setStatusFormIndex } =
    useContext(EnquiryStatusContext);
  const { api } = useAxios();
  const { refetch } = useContext(EnquiriesContext);

  const EnquiryStatusForm = () => {
    const [input, setInput] = useState('');

    return (
      <form
        className="flex items-center"
        onSubmit={(e) => {
          e.preventDefault();
          api
            .patch(`enquiries/${id}/`, { status: input })
            .then((res) => {
              if (res?.data) {
                refetch();
                setStatusFormIndex(null);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="w-40 border border-gray-300 rounded-md p-1"
        />
        <button
          type="button"
          className="relative flex items-center justify-center gap-1 lg:text-base rounded-lg font-medium hover:text-red-700 ml-2"
          onClick={() => setStatusFormIndex(null)}
        >
          <CloseSquare className="size-5" />
        </button>
        <button className="relative flex items-center justify-center gap-1 lg:text-base rounded-lg font-medium hover:text-dark-blue-500 ml-2">
          <TickSquare className="size-5" />
        </button>
      </form>
    );
  };

  if (statusFormIndex === id) {
    return <EnquiryStatusForm />;
  } else {
    return (
      <div className="flex items-center gap-2">
        <span className="capitalize">
          {typeof status === 'string' ? status : 'new'}
        </span>

        <button
          type="button"
          className="font-medium rounded-full text-sm text-center inline-flex items-center hover:text-green-600"
          onClick={() => setStatusFormIndex(id)}
        >
          <Edit className="size-4" />
        </button>
      </div>
    );
  }
};

const EnquiriesTableRow = ({
  enquiry,
  refetch,
  changeColName = () => {},
  id,
}) => {
  if (!enquiry) {
    return null;
  } else {
    const Resource = (changeColName = () => {}) => {
      if (enquiry.resource_type.toLowerCase() === 'property') {
        return (
          <Link
            to={`/enquiries/${enquiry.resource_id}/`}
            className="hover:underline"
          >
            {enquiry.resource_id}
          </Link>
        );
      } else if (enquiry.resource_type.toLowerCase() === 'project') {
        return (
          <Link
            to={`/enquiries/${enquiry.resource_id}/`}
            className="hover:underline"
          >
            {enquiry.resource_id}
          </Link>
        );
      }
    };

    return (
      <tr className="border-b bg-white">
        <td className="px-6 py-4 font-medium text-gray-900" width={200}>
          <h3 className="text-base font-semibold leading-relaxed capitalize">
            {enquiry.name}
          </h3>
        </td>
        <td className="px-6 py-4" width={200}>
          {enquiry.email}
        </td>
        <td className="px-6 py-4" width={200}>
          {enquiry.phone}
        </td>
        <td className="px-6 py-4" width={200}>
          <Resource changeColName={changeColName} />
        </td>
        <td className="px-6 py-4" width={200}>
          <EnquiryStatus id={id} status={enquiry.status} />
        </td>
        <td className="px-6 py-4" width={200}>
          <span className="whitespace-nowrap">{formatDate(enquiry.date)}</span>
        </td>
        <td className="px-6 py-4">
          <EnquiriesTableAction id={enquiry.id} refetch={refetch} />
        </td>
      </tr>
    );
  }
};

const EnquiriesTable = ({ className = '' }) => {
  const [headList, setHeadList] = useState([
    'name',
    'email',
    'phone',
    'property',
    'status',
    'date',
    'action',
  ]);

  function changeColName(search = '', needle = '') {
    setHeadList((prev) =>
      prev.map((item) => {
        if (item.toLowerCase() === needle.toLowerCase()) {
          return search;
        } else {
          return item;
        }
      }),
    );
  }

  const {
    state: enquiries,
    setPageNumber,
    page_size,
    refetch,
  } = useContext(EnquiriesContext);

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
                  <th scope="col" className="text-start px-6 py-3" width={120}>
                    {headList[6]}
                  </th>
                </tr>
              </thead>
              <tbody>
                <EnquiryStatusProvider>
                  {enquiries
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((_, i) => {
                      return (
                        <Fragment key={i}>
                          <EnquiriesTableRow
                            id={_.id} // it require here
                            enquiry={_}
                            refetch={refetch}
                            changeColName={changeColName}
                          />
                        </Fragment>
                      );
                    })}
                </EnquiryStatusProvider>
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
