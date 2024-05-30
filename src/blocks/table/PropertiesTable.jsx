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
import StatusIndicator from '../../components/StatusIndicator';
import getImageURL from '../../utils/getImageURL';
import AgentLink from '../../components/AgentLink';
import TD from '../../components/table/TD';
import TBody from '../../components/table/TBody';
import THead from '../../components/table/THead';
import { useSearchParams } from 'react-router-dom';
import Print from '../../components/Print';

function CountryCityArea(country, city, area) {
  if (typeof country === 'string' && typeof city === 'string') {
    return (
      <p className="text-sm text-gray-500 font-normal">
        {area && <span>{area},</span>}
        {city && <span>{city},</span>}
        {country && <span>{country},</span>}
      </p>
    );
  }
}

const PropertiesTableDetailsField = ({ property }) => {
  if (!property) {
    return null;
  } else {
    const image = property.images[0];
    const imageURL = image ? getImageURL(image.image) : '';

    return (
      <div className="flex w-96 flex-row items-center gap-4 rounded-lg text-gray-800">
        <div className="grid h-20 w-20 flex-shrink-0 place-items-center rounded-full bg-gray-50">
          {property.images?.length > 0 && (
            <img
              src={imageURL}
              alt={imageURL}
              className="w-full h-full object-cover rounded-full overflow-hidden"
            />
          )}
        </div>
        <div>
          <h3 className="text-base font-bold leading-relaxed capitalize">
            {property.title}
          </h3>
          <CountryCityArea {...property} />
          <p className="text-sm mt-2">
            AED {Intl.NumberFormat().format(property.price)}
          </p>
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
      <ActionEdit to={`/properties/${id}/edit/description`} />
      <DeleteModal onDelete={onDelete} />
    </div>
  );
};

const PropertiesTableRow = ({ property, refetch }) => {
  if (!property) return;

  return (
    <tr className="text-gray-800">
      <TD className="">
        <PropertiesTableDetailsField property={property} />
      </TD>
      <TD className="whitespace-nowrap">{formatDate(property.created_on)}</TD>
      <TD className="capitalize">{property.category?.title}</TD>
      <TD className="capitalize">
        {property.listed_in == 'sale' ? 'For Sale' : 'For Rent'}
      </TD>
      <TD className="capitalize">
        <AgentLink agent={property.agent} />
      </TD>
      <TD className="capitalize">
        <StatusIndicator status={property.status ? 'active' : 'inactive'} />
      </TD>
      <TD className="capitalize">
        <PropertiesTableAction property={property} refetch={refetch} />
      </TD>
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
        <AddButton to="/properties/create/description">
          Add new property
        </AddButton>
      </div>
    </div>
  );
};

const PropertiesTable = ({ properties, refetch }) => {
  const count = properties?.count || 0;
  properties = properties?.results;

  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const maxPerPage = 10;

  const headList = [
    'listing title',
    'date published',
    'category',
    'listed in',
    'agent',
    'status',
    'action',
  ];

  const TH = ({ children, className = '', ...props }) => (
    <th
      className={twMerge('text-start px-6 py-3 whitespace-nowrap', className)}
      {...props}
    >
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

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  return (
    <div className="space-y-4">
      <TableTopSection onSearch={onSearch} />
      {
        // replace agent with your needle
        properties ? (
          <div className="bg-white p-4 space-y-4">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-gray-500 rtl:text-right">
                <THead>
                  <tr>
                    {headList.map((head, i) => {
                      return (
                        <TH
                          scope="col"
                          key={i}
                          className={twMerge(
                            'px-6 py-3',
                            i == 0 || i == headList.length - 1
                              ? 'rounded-l-lg'
                              : '',
                          )}
                        >
                          {head}
                        </TH>
                      );
                    })}
                  </tr>
                </THead>
                <TBody>
                  {filteredProperties
                    .sort(
                      (a, b) => new Date(b.updated_on) - new Date(a.updated_on),
                    )
                    .map((property, i) => {
                      return (
                        <Fragment key={i}>
                          <PropertiesTableRow
                            property={property}
                            refetch={refetch}
                          />
                        </Fragment>
                      );
                    })}
                </TBody>
              </table>
            </div>
            <Pagination
              totalPages={new Array(Math.ceil(count / maxPerPage))
                .fill()
                .map((_, i) => i + 1)}
              currentPage={currentPage}
            />
            <TableSummary
              totalData={count}
              dataPerPage={maxPerPage}
              currentPage={currentPage}
            />
          </div>
        ) : (
          <p className="px-4">No properties found</p>
        )
      }
    </div>
  );
};

export default PropertiesTable;
