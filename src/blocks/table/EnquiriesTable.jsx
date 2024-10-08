import { Fragment, useContext, useState } from 'react';
import ActionDelete from '../../components/action-buttons/Delete';
import Pagination from '../../components/table/pagination/Pagination';
import TableSummary from '../../components/table/agent/AgentDescFooter';
import useAxios from '../../context/useAxios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
import Print from '../../components/Print';
import TD from '../../components/table/TD';
import TBody from '../../components/table/TBody';
import THead from '../../components/table/THead';

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

const EnquiriesTableRow = ({ enquiry, refetch, id }) => {
  const Resource = (type, id) => {
    let path = '';
    if (enquiry.resource_type.toLowerCase() === 'property') {
      path = '/properties';
    }
    if (enquiry.resource_type.toLowerCase() === 'project') {
      path = '/projects';
    }

    return (
      <Link to={`${path}/${enquiry.resource_id}/`} className="hover:underline">
        {enquiry.resource_id}
      </Link>
    );
  };

  if (!enquiry) {
    return null;
  } else {
    return (
      <tr className="text-gray-900">
        <TD className="px-6 py-4 font-medium text-gray-900" width={200}>
          <h3 className="text-base font-semibold leading-relaxed capitalize">
            {enquiry.name}
          </h3>
        </TD>
        <TD className="px-6 py-4" width={200}>
          <Link to={`mailto:${enquiry.email}`} className="hover:underline">
            {enquiry.email}
          </Link>
        </TD>
        <TD className="px-6 py-4" width={200}>
          <Link to={`tel:${enquiry.phone}`} className="hover:underline">
            {enquiry.phone}
          </Link>
        </TD>
        <TD className="px-6 py-4" width={200}>
          <Resource />
        </TD>
        <TD className="px-6 py-4" width={200}>
          <EnquiryStatus id={id} status={enquiry.status} />
        </TD>
        <TD className="px-6 py-4" width={200}>
          <span className="whitespace-nowrap">{formatDate(enquiry.date)}</span>
        </TD>
        <TD className="px-6 py-4" width={200}>
          {enquiry.updated_on && (
            <span className="whitespace-nowrap">
              {formatDate(enquiry.updated_on)}
            </span>
          )}
        </TD>
        <TD className="px-6 py-4">
          <EnquiriesTableAction id={enquiry.id} refetch={refetch} />
        </TD>
      </tr>
    );
  }
};

const EnquiriesTable = ({
  className = '',
  enquiries,
  setPageNumber,
  page_size,
  refetch,
}) => {
  const [headList, setHeadList] = useState([
    'name',
    'email',
    'phone',
    'property',
    'status',
    'date',
    'updated on',
    'action',
  ]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  function changeColName(search = '', needle = '') {
    setHeadList((prev) =>
      prev?.map((item) => {
        if (item.toLowerCase() === needle.toLowerCase()) {
          return search;
        } else {
          return item;
        }
      }),
    );
  }

  if (Array.isArray(enquiries)) {
    return enquiries.length > 0 ? (
      <div
        className={twMerge(className, 'bg-white p-4 space-y-4 overflow-x-auto')}
      >
        <table className="w-full text-sm text-gray-500 rtl:text-right">
          <THead>
            <tr>
              {headList?.map((_, i) => (
                <th
                  scope="col"
                  className={`text-start px-6 py-3 ${
                    i === 0 || i == headList.length - 1 ? 'rounded-l-lg' : ''
                  }`}
                  key={i}
                  width={i === headList.length - 1 ? 120 : 'auto'}
                >
                  {_}
                </th>
              ))}
            </tr>
          </THead>
          <TBody>
            <EnquiryStatusProvider>
              {enquiries
                ?.sort((a, b) => new Date(b.date) - new Date(a.date))
                ?.slice(page_size * (currentPage - 1), page_size * currentPage)
                ?.map((_, i) => {
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
          </TBody>
        </table>
        <Pagination
          totalPages={new Array(Math.ceil(enquiries.length / page_size))
            ?.fill()
            ?.map((_, i) => i + 1)}
          currentPage={currentPage}
          setPageNumber={setPageNumber}
        />
        <TableSummary
          totalData={enquiries.length}
          dataPerPage={page_size}
          currentPage={currentPage}
        />
      </div>
    ) : (
      <p className={twMerge(className, 'p-4 bg-white rounded-lg')}>
        No locations found
      </p>
    );
  }
};

export default EnquiriesTable;
