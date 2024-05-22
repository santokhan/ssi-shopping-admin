import { Fragment, useContext } from 'react';
import ActionEdit from '../../components/action-buttons/Edit';
import Pagination from '../../components/table/pagination/Pagination';
import TableSummary from '../../components/table/agent/AgentDescFooter';
import useAxios from '../../context/useAxios';
import { twMerge } from 'tailwind-merge';
import { DevelopersContext } from '../../context/developers/developers-context';
import DeleteModal from '../../components/DeleteModal';
import TBody from '../../components/table/TBody';
import THead, { THeadList } from '../../components/table/THead';
import TD from '../../components/table/TD';

const FeaturesTableAction = ({ feature, refetch }) => {
  const { api } = useAxios();

  function onDelete() {
    api
      .delete(`developers/${feature.id}/`)
      .then((res) => {
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!feature) {
    return null;
  } else {
    return (
      <div className="flex gap-3">
        <ActionEdit to={`/developers/${feature.id}/edit`} />
        <DeleteModal onDelete={onDelete} />
      </div>
    );
  }
};

const FeaturesTableRow = ({ feature, refetch }) => {
  if (!feature) {
    return null;
  } else {
    return (
      <tr className="text-gray-900">
        <TD className="font-medium">
          <h3 className="text-base font-semibold leading-relaxed">
            {feature.name}
          </h3>
        </TD>
        <TD>
          <div className="grid size-12 flex-shrink-0 place-items-center rounded-xl bg-gray-50">
            <img
              src={feature.image}
              alt={feature.image}
              className="w-full h-full object-cover rounded-full overflow-hidden"
            />
          </div>
        </TD>
        <TD>
          <FeaturesTableAction feature={feature} refetch={refetch} />
        </TD>
      </tr>
    );
  }
};

const DevelopersTable = ({ className = '' }) => {
  const { developers, setPageNumber, page_size, refetch } =
    useContext(DevelopersContext);

  const headList = ['name', 'profile', 'action'];

  if (!developers) {
    return null;
  } else {
    return (
      <>
        {developers.length > 0 ? (
          <div
            className={twMerge(
              className,
              'bg-white p-4 space-y-4 overflow-x-auto',
            )}
          >
            <table className="w-full text-sm text-gray-500 rtl:text-right">
              <THead className="bg-gray-100 text-xs font-semibold uppercase text-gray-700">
                <THeadList headList={headList} />
              </THead>
              <TBody>
                {developers.map((feature, i) => {
                  return (
                    <Fragment key={i}>
                      <FeaturesTableRow feature={feature} refetch={refetch} />
                    </Fragment>
                  );
                })}
              </TBody>
            </table>
            <Pagination
              totalPages={new Array(Math.ceil(developers.length / page_size))
                .fill()
                .map((_, i) => i + 1)}
              currentPage={1}
              setPageNumber={setPageNumber}
            />
            <TableSummary
              totalData={Math.ceil(developers.length / page_size)}
              dataPerPage={10}
            />
          </div>
        ) : (
          <p className={twMerge(className, 'p-4 bg-white rounded-lg')}>
            No developers found
          </p>
        )}
      </>
    );
  }
};

export default DevelopersTable;
