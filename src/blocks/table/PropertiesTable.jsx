import { Fragment, useEffect, useState } from 'react';
import ActionEdit from '../../components/action-buttons/Edit';
import Pagination from '../../components/table/pagination/Pagination';
import TableSummary from '../../components/table/agent/AgentDescFooter';
import TableSearch from './TableSearch';
import AddButton from '../../components/table/AddButton';
import TableTitle from '../../components/table/TableTitle';
import useAxios from '../../context/useAxios';
import { toast } from 'react-toastify';
import formatDate from '../../utils/formatDate';
import { twMerge } from 'tailwind-merge';
import DeleteModal from '../../components/DeleteModal';
import { Link } from 'react-router-dom';

const PropertiesTableDetailsField = ({ property }) => {
  if (!property) {
    return null;
  } else {
    return (
      <div className="flex w-72 flex-row items-center gap-4 rounded-lg text-gray-800">
        <div className="grid h-20 w-20 flex-shrink-0 place-items-center rounded-full bg-gray-50">
          {property.images?.length > 0 && (
            <img
              src={property.images[0]}
              alt={property.images[0]}
              className="w-full h-full object-cover rounded-full overflow-hidden"
            />
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold leading-relaxed capitalize">
            {property.title}
          </h3>
          <p className="text-sm text-gray-500 font-normal">
            {property.area && <span>{property.area},</span>}
            {property.city && <span>{property.city},</span>}
            {property.country && <span>{property.country},</span>}
          </p>
          <strong className="text-sm font-bold mt-2">
            AED {Intl.NumberFormat().format(property.price)}
          </strong>
        </div>
      </div>
    );
  }
};

const PropertiesTableAction = ({ property, refetch }) => {
  const { api } = useAxios();

  if (!property) {
    return null;
  }

  const id = property.id;

  function onDelete() {
    api
      .delete('properties/' + id + '/')
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
    <div className="flex gap-3">
      <ActionEdit to={`/properties/${id}/edit/`} />
      <DeleteModal onDelete={onDelete} />
    </div>
  );
};

const PropertiesTableRow = ({ property, refetch }) => {
  if (!property) {
    return null;
  }

  const AgentLink = ({ id = null }) => {
    const [agent, setAgent] = useState(null);
    const { api } = useAxios();

    useEffect(() => {
      async function getAgent(id = null) {
        if (id === null) {
          return null;
        }

        try {
          const res = await api.get('agents/' + id + '/');
          setAgent(res.data);
        } catch (error) {
          console.log(error);
        }
      }

      getAgent(id);
    }, [id]);

    if (typeof id === 'number') {
      return agent ? (
        <Link
          to={'/agents/' + property.agent + '/'}
          className="hover:text-blue-500"
        >
          {agent.display_name}
        </Link>
      ) : (
        'Loading...'
      );
    }
  };

  return (
    <tr className="border-b bg-white text-gray-800">
      <td className="px-6 py-4 font-medium">
        <PropertiesTableDetailsField property={property} />
      </td>
      {/* created on */}
      <td className="whitespace-nowrap px-6 py-4 font-medium">
        {formatDate(property.created_on)}
      </td>
      <td className="px-6 py-4 font-medium">{property.category}</td>
      <td className="px-6 py-4 font-medium">{property.listed_in}</td>
      <td className="px-6 py-4 font-medium">
        <AgentLink id={property.agent} />
      </td>
      <td className="px-6 py-4">
        <PropertiesTableAction property={property} refetch={refetch} />
      </td>
    </tr>
  );
};

const tableTitle = 'All Properties';

const TableTopSection = ({ onSearch = (needle) => {} }) => {
  return (
    <div className="relative flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
      <div className="w-full md:w-1/2">
        <TableTitle>{tableTitle}</TableTitle>
      </div>
      <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
        <TableSearch onFilter={onSearch} />
        <AddButton to="create">Add new property</AddButton>
      </div>
    </div>
  );
};

const PropertiesTable = ({ properties, refetch, page_size, setPageNumber }) => {
  properties = properties?.results;
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const headList = [
    'Listing Title',
    'Date Published',
    'Category',
    'Listed In',
    'Agent',
    'Action',
  ];

  const TH = ({ children, className = '', ...props }) => (
    <th className={twMerge('text-start px-6 py-3', className)} {...props}>
      {children}
    </th>
  );

  function onSearch(needle) {
    if (needle && needle.length > 0) {
      // console.log({ needle });
      setFilteredProperties(
        /** Filter agents not already filtered items filteredAgents */
        properties.filter((property) => {
          const target = property.title.trim().toLowerCase();
          const value = needle.trim().toLowerCase();
          console.log({ target, value, result: target.includes(value) });
          return target.includes(value);
        }),
      );
    } else {
      setFilteredProperties(properties);
    }
  }

  return (
    <div className="space-y-4">
      <TableTopSection onSearch={onSearch} />
      {
        // replace agent with your needle
        properties ? (
          <div className="bg-white p-4 space-y-4">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-gray-500 rtl:text-right">
                <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-700">
                  <tr>
                    <TH scope="col" className="rounded-l-lg">
                      {headList[0]}
                    </TH>
                    <TH scope="col" className="">
                      {headList[1]}
                    </TH>
                    <TH scope="col" className="">
                      {headList[2]}
                    </TH>
                    <TH scope="col" className="">
                      {headList[3]}
                    </TH>
                    <TH scope="col" className="rounded-r-lg">
                      {headList[4]}
                    </TH>
                    <TH scope="col" className="rounded-r-lg">
                      {headList[5]}
                    </TH>
                  </tr>
                </thead>
                <tbody>
                  {filteredProperties.map((property, i) => {
                    return (
                      <Fragment key={i}>
                        <PropertiesTableRow
                          property={property}
                          refetch={refetch}
                        />
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination
              totalPages={new Array(Math.ceil(properties.length / page_size))
                .fill()
                .map((_, i) => i + 1)}
              currentPage={1}
              setPageNumber={setPageNumber}
              isNextExist={Boolean(properties.next)}
            />
            <TableSummary totalData={properties.length} />
          </div>
        ) : (
          <p className="px-4">No properties found</p>
        )
      }
    </div>
  );
};

export default PropertiesTable;
