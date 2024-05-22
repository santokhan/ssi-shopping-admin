import { Fragment, useContext } from 'react';
import ActionDelete from '../../components/action-buttons/Delete';
import ActionEdit from '../../components/action-buttons/Edit';
import Pagination from '../../components/table/pagination/Pagination';
import TableSummary from '../../components/table/agent/AgentDescFooter';
import useAxios from '../../context/useAxios';
import { useNavigate } from 'react-router-dom';
import { AmenitiesContext } from '../../context/amenities/amenities-context';
import { twMerge } from 'tailwind-merge';
import DeleteModal from '../../components/DeleteModal';
import TBody from '../../components/table/TBody';
import TD from '../../components/table/TD';
import THead, { THeadList } from '../../components/table/THead';

const AmenitiesTableAction = ({ amenities, refetch }) => {
  const { api } = useAxios();
  const { setValue } = useContext(AmenitiesContext);
  const navigate = useNavigate();

  if (!amenities) {
    return null;
  }

  function onDelete() {
    api
      .delete(`amenities/${amenities.id}/`)
      .then(() => {
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex gap-3">
      <ActionEdit to={`/amenities/${amenities.id}/edit`} />
      <DeleteModal onDelete={onDelete} />
    </div>
  );
};

const AmenitiesTableRow = ({ amenities, refetch }) => {
  if (!amenities) {
    return null;
  }

  return (
    <tr className="text-gray-900">
      <TD className="">
        <h3 className="text-base font-semibold leading-relaxed">
          {amenities.title}
        </h3>
      </TD>
      <TD>
        <div className="grid size-14 flex-shrink-0 place-items-center rounded-xl bg-gray-50">
          <img
            src={amenities.icon}
            alt={amenities.icon}
            className="w-full h-full object-cover overflow-hidden p-2"
          />
        </div>
      </TD>
      <TD>
        <AmenitiesTableAction amenities={amenities} refetch={refetch} />
      </TD>
    </tr>
  );
};

const AmenitiesTable = ({ className = '' }) => {
  const { amenities, setPageNumber, page_size, refetch } =
    useContext(AmenitiesContext);

  if (!amenities) {
    return null;
  }

  const headList = ['amenities title', 'amenities image', 'action'];

  return (
    <>
      {amenities.length > 0 ? (
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
              {amenities
                .sort((a, b) => new Date(b.updated_on) - new Date(a.updated_on))
                .map((amenities, i) => {
                  return (
                    <Fragment key={i}>
                      <AmenitiesTableRow
                        amenities={amenities}
                        refetch={refetch}
                      />
                    </Fragment>
                  );
                })}
            </TBody>
          </table>
          <Pagination
            totalPages={new Array(Math.ceil(amenities.length / page_size))
              .fill()
              .map((_, i) => i + 1)}
            currentPage={1}
            setPageNumber={setPageNumber}
          />
          <TableSummary
            totalData={Math.ceil(amenities.length / page_size)}
            dataPerPage={10}
          />
        </div>
      ) : (
        <p className={twMerge(className, 'p-4 bg-white rounded-lg')}>
          No amenities found
        </p>
      )}
    </>
  );
};

export default AmenitiesTable;
