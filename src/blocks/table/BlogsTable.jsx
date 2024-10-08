import { Fragment, useContext, useEffect, useState } from 'react';
import ActionEdit from '../../components/action-buttons/Edit';
import TableSearch from './TableSearch';
import AddButton from '../../components/table/AddButton';
import useAxios from '../../context/useAxios';
import DeleteModal from '../../components/DeleteModal';
import formatDate from '../../utils/formatDate';
import { BlogsContext } from '../../context/BlogsContext';
import THead from '../../components/table/THead';
import TBody from '../../components/table/TBody';
import TH from '../../components/table/TH';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../components/table/pagination/Pagination';
import TableSummary from '../../components/table/agent/AgentDescFooter';

const DetailsColumn = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <div className="flex w-full flex-row items-center space-x-4 rounded-lg text-gray-800">
      <div className="grid h-20 w-20 flex-shrink-0 place-items-center rounded-xl bg-gray-50">
        <img
          src={data.featured_image}
          alt={data.featured_image}
          className="w-full h-full object-cover rounded-full overflow-hidden"
          title={data.featured_image}
        />
      </div>
      <div>
        <h3 className="text-base font-semibold leading-relaxed">
          {data.title}
        </h3>
        <p className="text-sm text-gray-500 font-normal">{data.sub_title}</p>
      </div>
    </div>
  );
};

const TableAction = ({ data }) => {
  const { api } = useAxios();
  const { refetch } = useContext(BlogsContext);

  function onDelete() {
    api
      .delete(`blogs/${data.id}/`)
      .then((res) => {
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!data) {
    return null;
  } else {
    return (
      <div className="flex gap-3">
        <ActionEdit to={`/news/${data.id}/edit`} />
        <DeleteModal onDelete={onDelete} />
      </div>
    );
  }
};

const TableRow = ({ data }) => {
  if (data) {
    return (
      <tr className="text-gray-900">
        <td className="px-6 py-4 font-medium text-gray-900 min-w-64">
          <DetailsColumn data={data} />
        </td>
        <td className="px-6 py-4 min-w-80 max-w-sm">
          {data.description?.slice(0, 120)}
        </td>
        <td className="whitespace-nowrap text-gray-900">
          {formatDate(data.published_on)}
        </td>
        <td className="px-6 py-4">
          <TableAction data={data} />
        </td>
      </tr>
    );
  }
};

const TableTopSection = ({ onSearch = (needle = '') => {} }) => {
  return (
    <div className="relative flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl lg:text-3xl font-medium text-gray-900">
          All Blogs
        </h2>
      </div>
      <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
        <TableSearch onFilter={onSearch} />
        <AddButton to="create">Add new blog</AddButton>
      </div>
    </div>
  );
};

const BlogsTable = ({ setPageNumber, page_size }) => {
  const { data } = useContext(BlogsContext);
  const [filtered, setFiltered] = useState([]);
  let blogList = data?.results;

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1;

  useEffect(() => {
    if (blogList) {
      setFiltered(blogList);
    }
  }, [blogList]);

  function onSearch(needle) {
    if (needle && needle.length > 0) {
      setFiltered(
        blogList?.filter((_) => {
          const target = _.display_name?.trim().toLowerCase();
          const value = needle.trim().toLowerCase();
          console.log({ target, value, result: target.includes(value) });
          return target.includes(value);
        }),
      );
    } else {
      setFiltered(blogList);
    }
  }

  return (
    <div className="space-y-4">
      <TableTopSection onSearch={onSearch} />
      {filtered ? (
        <div className="bg-white p-4 space-y-4">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-gray-500 rtl:text-right">
              <THead>
                <tr>
                  <TH className="rounded-l">Blog Name</TH>
                  <TH className="">Description</TH>
                  <TH className="">Date Added</TH>
                  <TH className="rounded-r">Action</TH>
                </tr>
              </THead>
              <TBody>
                {filtered
                  ?.slice((currentPage - 1) * page_size, currentPage * page_size)
                  .sort(
                    (a, b) => new Date(b.updated_on) - new Date(a.updated_on),
                  )
                  ?.map((_, i) => {
                    return (
                      <Fragment key={i}>
                        <TableRow data={_} SN={i + 1} />
                      </Fragment>
                    );
                  })}
              </TBody>
            </table>
          </div>
          <Pagination
            totalPages={new Array(Math.ceil(filtered.length / page_size))
              .fill()
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
        <p className="px-4">No records found</p>
      )}
    </div>
  );
};

export default BlogsTable;
