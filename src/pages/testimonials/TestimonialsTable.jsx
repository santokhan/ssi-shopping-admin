import { Fragment, useEffect, useState } from 'react';
import TableTitle from '../../components/table/TableTitle';
import useAxios from '../../context/useAxios';
import NoRecordsFound from '../../components/NoRecordsFound';
import TD from '../../components/table/TD';
import formatDate from '../../utils/formatDate';
import Actions from '../../components/action-buttons/ActionFlex';
import { useLocation, useSearchParams } from 'react-router-dom';
import THead, { THeadList } from '../../components/table/THead';
import TBody from '../../components/table/TBody';
import Pagination from '../../components/table/pagination/Pagination';
import TableSummary from '../../components/table/agent/AgentDescFooter';
import Print from '../../components/Print';

const TestiActions = ({ id, refetch }) => {
  const { api } = useAxios();
  const location = useLocation();
  const pathname = location.pathname.replace('/', '');
  function onDelete() {
    api
      .delete(`testimonials/${id}/`)
      .then((res) => {
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    id && (
      <Actions.Box>
        <Actions.Edit to={`/${pathname}/${id}/edit/`} />
        <Actions.Delete onDelete={onDelete} />
      </Actions.Box>
    )
  );
};

const TestiTableRows = ({
  id,
  title,
  description,
  rating,
  author,
  image,
  added_on,
  refetch,
}) => {
  return (
    id && (
      <tr className="text-gray-800">
        <TD className="font-semibold" width="220">
          {title}
        </TD>
        <TD className="capitalize" width="400">
          {description}
        </TD>
        <TD className="capitalize" width="80">
          {rating}
        </TD>
        <TD className="capitalize" width="160">
          {author}
        </TD>
        <TD width="100">
          {image.includes('https') && (
            <img
              src={image}
              alt={image}
              className="size-10 rounded-full object-cover"
            />
          )}
        </TD>
        <TD width="150">{formatDate(added_on)}</TD>
        <TD width="80">
          <TestiActions id={id} refetch={refetch} />
        </TD>
      </tr>
    )
  );
};

const tableTitle = 'All Reviews';

const TableTopSection = ({ onSearch = (needle) => {} }) => {
  return (
    <div className="relative flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
      <div className="w-full md:w-1/2">
        <TableTitle>{tableTitle}</TableTitle>
      </div>
      {/* <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
        <AddButton to="/testimonials/create/">Add new testimonials</AddButton>
      </div> */}
    </div>
  );
};

const TestimonialsTable = ({ testimonials, refetch, setPageNumber }) => {
  const [filtered, setFiltered] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1;
  const page_size = 10;

  useEffect(() => {
    if (Array.isArray(testimonials) && testimonials.length > 0) {
      setFiltered(testimonials);
    }
  }, [testimonials]);

  const headList = [
    'title',
    'description',
    'rating',
    'author',
    'image',
    'added on',
    'action',
  ];

  function onSearch(needle) {
    if (needle && needle.length > 0) {
      // console.log({ needle });
      setFiltered(
        /** Filter agents not already filtered items filteredAgents */
        testimonials?.filter((property) => {
          const target = property.title.trim().toLowerCase();
          const value = needle.trim().toLowerCase();
          console.log({ target, value, result: target.includes(value) });
          return target.includes(value);
        }),
      );
    } else {
      setFiltered(testimonials);
    }
  }

  return (
    <div className="space-y-4">
      <TableTopSection onSearch={onSearch} />
      {filtered.length > 0 ? (
        <div className="bg-white p-4 space-y-4">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-gray-500 rtl:text-right">
              <THead>
                <THeadList headList={headList} />
              </THead>
              <TBody>
                {filtered
                  ?.slice(
                    page_size * (currentPage - 1),
                    page_size * currentPage,
                  )
                  ?.sort((a, b) => new Date(b.added_on) - new Date(a.added_on))
                  ?.map((_, i) => {
                    return (
                      <Fragment key={i}>
                        <TestiTableRows {..._} refetch={refetch} />
                      </Fragment>
                    );
                  })}
              </TBody>
            </table>
          </div>
          <Pagination
            totalPages={new Array(Math.ceil(filtered.length / page_size))
              ?.fill()
              ?.map((_, i) => i + 1)}
            currentPage={currentPage}
            setPageNumber={setPageNumber}
          />
          <TableSummary
            totalData={filtered.length}
            dataPerPage={page_size}
            currentPage={currentPage}
          />
        </div>
      ) : (
        <NoRecordsFound />
      )}
    </div>
  );
};

export default TestimonialsTable;
