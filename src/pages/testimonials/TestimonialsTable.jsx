import { Fragment, useEffect, useState } from 'react';
import AddButton from '../../components/table/AddButton';
import TableTitle from '../../components/table/TableTitle';
import useAxios from '../../context/useAxios';
import { toast } from 'react-toastify';
import NoRecordsFound from '../../components/NoRecordsFound';
import TH from '../../components/table/TH';
import TD from '../../components/table/TD';
import formatDate from '../../utils/formatDate';
import Actions from '../../components/action-buttons/ActionFlex';

const TestiActions = ({ id, refetch }) => {
  const { api } = useAxios();
  function onDelete() {
    api
      .delete('projects/' + id + '/')
      .then((res) => {
        toast(`Deleted`, {
          type: 'success',
        });
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    id && (
      <Actions.Box>
        <Actions.Edit to={`/projects/${id}/edit/description`} />
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
}) => {
  return (
    id && (
      <tr className="bg-white text-gray-800">
        <TD className="font-medium" width="300">
          {title}
        </TD>
        <TD className="font-medium capitalize">{description}</TD>
        <TD className="font-medium capitalize" width="80">
          {rating}
        </TD>
        <TD className="font-medium capitalize" width="200">
          {author}
        </TD>
        <TD className="" width="100">
          {image.includes('https') && (
            <img src={image} alt={image} className="w-10 h-10 rounded-full" />
          )}
        </TD>
        <TD className="" width="150">
          {formatDate(added_on)}
        </TD>
        <TD className="" width="80">
          <TestiActions id={id} />
        </TD>
      </tr>
    )
  );
};

const tableTitle = 'All Projects';

const TableTopSection = ({ onSearch = (needle) => {} }) => {
  return (
    <div className="relative flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
      <div className="w-full md:w-1/2">
        <TableTitle>{tableTitle}</TableTitle>
      </div>
      <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
        <AddButton to="/projects/create/description">
          Add new projects
        </AddButton>
      </div>
    </div>
  );
};

const TestimonialsTable = ({
  testimonials,
  refetch,
  page_size,
  setPageNumber,
}) => {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (Array.isArray(testimonials) && testimonials.length > 0) {
      console.log(testimonials);

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
        testimonials.filter((property) => {
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
              <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-700">
                <tr>
                  <TH className="rounded-l-lg">{headList[0]}</TH>
                  <TH>{headList[1]}</TH>
                  <TH>{headList[2]}</TH>
                  <TH>{headList[3]}</TH>
                  <TH>{headList[4]}</TH>
                  <TH>{headList[5]}</TH>
                  <TH className="rounded-r-lg">{headList[6]}</TH>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((_, i) => {
                  return (
                    <Fragment key={i}>
                      <TestiTableRows {..._} refetch={refetch} />
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* <Pagination
            totalPages={new Array(Math.ceil(filtered.length / page_size))
              .fill()
              .map((_, i) => i + 1)}
            currentPage={1}
            setPageNumber={setPageNumber}
            isNextExist={Boolean(filtered.next)}
          /> */}
          {/* <TableSummary totalData={filtered.length} /> */}
        </div>
      ) : (
        <NoRecordsFound />
      )}
    </div>
  );
};

export default TestimonialsTable;
