import { Fragment, useContext } from 'react';
import ActionEdit from '../../components/action-buttons/Edit';
import Pagination from '../../components/table/pagination/Pagination';
import TableSummary from '../../components/table/agent/AgentDescFooter';
import useAxios from '../../context/useAxios';
import { twMerge } from 'tailwind-merge';
import { FeaturesContext } from '../../context/features/features-context';
import EllipseImagePreview from '../../components/EllipseImagePreview';
import DeleteModal from '../../components/DeleteModal';

const FeaturesTableAction = ({ feature, refetch }) => {
  const { api } = useAxios();

  function onDelete() {
    api
      .delete(`features/${feature.id}/`)
      .then(() => {
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
        <ActionEdit to={`/features/${feature.id}/edit`} />
        <DeleteModal onDelete={onDelete} />
      </div>
    );
  }
};

const FeaturesTableRow = ({ feature, refetch }) => {
  if (!feature) {
    return null;
  }

  return (
    <tr className="border-b bg-white">
      <td className="px-6 py-4 font-medium text-gray-900">
        <h3 className="text-base font-semibold leading-relaxed">
          {feature.name}
        </h3>
      </td>
      <td className="px-6 py-4">
        <EllipseImagePreview src={feature.image} />
      </td>
      <td className="px-6 py-4">
        <FeaturesTableAction feature={feature} refetch={refetch} />
      </td>
    </tr>
  );
};

const FeaturesTable = ({ className = '' }) => {
  const { features, setPageNumber, page_size, refetch } =
    useContext(FeaturesContext);

  if (!features) {
    return null;
  }

  const headList = ['locations title', 'locations image', 'action'];

  return (
    <>
      {features.length > 0 ? (
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
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => {
                return (
                  <Fragment key={i}>
                    <FeaturesTableRow feature={feature} refetch={refetch} />
                  </Fragment>
                );
              })}
            </tbody>
          </table>
          <Pagination
            totalPages={new Array(Math.ceil(features.length / page_size))
              .fill()
              .map((_, i) => i + 1)}
            currentPage={1}
            setPageNumber={setPageNumber}
          />
          <TableSummary
            totalData={Math.ceil(features.length / page_size)}
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

export default FeaturesTable;
