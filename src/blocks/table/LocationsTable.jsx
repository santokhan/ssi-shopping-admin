import { useContext, useEffect, useState } from 'react';
import ActionEdit from '../../components/action-buttons/Edit';
import Pagination from '../../components/table/pagination/Pagination';
import TableSummary from '../../components/table/agent/AgentDescFooter';
import useAxios from '../../context/useAxios';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { LocationsContext } from '../../context/locations/locations-context';
import DeleteModal from '../../components/DeleteModal';
import THead, { THeadList } from '../../components/table/THead';
import TD from '../../components/table/TD';
import TBody from '../../components/table/TBody';

const LocationsTableAction = ({ location, refetch }) => {
  const { api } = useAxios();
  const navigate = useNavigate();

  if (!location) {
    return null;
  }

  function onDelete() {
    api
      .delete(`areas/${location.id}/`)
      .then((res) => {
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex gap-3">
      <ActionEdit to={`/locations/${location.id}/edit`} />
      <DeleteModal onDelete={onDelete} />
    </div>
  );
};

const LocationsTableRow = ({ location, refetch }) => {
  const [country, setCountry] = useState(null);
  const { api } = useAxios();

  useEffect(() => {
    const countryID = location.city.country;
    if (countryID) {
      api.get(`countries/${countryID}/`).then((res) => {
        setCountry(res.data);
      });
    }
  }, []);

  if (!location) {
    return null;
  } else {
    return (
      <tr className="bg-white">
        <TD>
          <h3 className="text-base font-semibold leading-relaxed">
            {location.name}
          </h3>
        </TD>
        <TD>
          <div className="grid size-12 flex-shrink-0 place-items-center rounded-xl bg-gray-50">
            <img
              src={location.icon}
              alt={location.icon}
              className="w-full h-full object-cover rounded-full overflow-hidden"
            />
          </div>
        </TD>
        <TD>{country?.name}</TD>
        <TD>{location.city.name}</TD>
        <TD>
          <LocationsTableAction location={location} refetch={refetch} />
        </TD>
      </tr>
    );
  }
};

const LocationsTable = ({ className = '' }) => {
  const { locations, setPageNumber, page_size, refetch } =
    useContext(LocationsContext);

  if (!locations) {
    return null;
  }

  const headList = ['title', 'image', 'country', 'city', 'action'];

  return (
    <>
      {locations.length > 0 ? (
        <div
          className={twMerge(
            className,
            'bg-white p-4 space-y-4 overflow-x-auto',
          )}
        >
          <table className="w-full text-sm text-gray-500 rtl:text-right">
            <THead>
              <THeadList headList={headList} />
            </THead>
            <TBody>
              {locations.map((location, i) => {
                return (
                  <LocationsTableRow
                    key={i}
                    location={location}
                    refetch={refetch}
                  />
                );
              })}
            </TBody>
          </table>
          <Pagination
            totalPages={new Array(Math.ceil(locations.length / page_size))
              .fill()
              .map((_, i) => i + 1)}
            currentPage={1}
            setPageNumber={setPageNumber}
          />
          <TableSummary
            totalData={Math.ceil(locations.length / page_size)}
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
};

export default LocationsTable;
