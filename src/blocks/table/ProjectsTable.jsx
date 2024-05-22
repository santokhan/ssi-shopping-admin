import { Fragment, useState } from 'react';
import ActionEdit from '../../components/action-buttons/Edit';
import Pagination from '../../components/table/pagination/Pagination';
import TableSummary from '../../components/table/agent/AgentDescFooter';
import TableSearch from './TableSearch';
import AddButton from '../../components/table/AddButton';
import TableTitle from '../../components/table/TableTitle';
import useAxios from '../../context/useAxios';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import DeleteModal from '../../components/DeleteModal';
import StatusIndicator from '../../components/StatusIndicator';
import getImageURL from '../../utils/getImageURL';
import NoRecordsFound from '../../components/NoRecordsFound';
import TH from '../../components/table/TH';
import MountListedIn from '../../components/MountListedIn';
import formatDate from '../../utils/formatDate';
import AgentLink from '../../components/AgentLink';
import TD from '../../components/table/TD';
import TBody from '../../components/table/TBody';
import THead from '../../components/table/THead';

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

const ProjectsTableDetailsField = ({ property }) => {
  if (!property) {
    return null;
  } else {
    const image = property.images[0];
    const imageURL = image ? getImageURL(image.image) : '';

    return (
      <div className="flex w-96 flex-row items-center gap-4 rounded-lg text-gray-800">
        <div className="grid size-20 flex-shrink-0 place-items-center rounded-full bg-gray-50">
          {property.images?.length > 0 && (
            <img
              src={imageURL}
              alt={imageURL}
              className="w-full h-full object-cover rounded-full overflow-hidden"
            />
          )}
        </div>
        <div>
          <h3 className="text-base font-bold leading-relaxedcapitalize">
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

const ProjectTableActions = ({ property, refetch }) => {
  const { api } = useAxios();

  if (!property) {
    return null;
  }

  const id = property.id;

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
    <div className="flex gap-3">
      <ActionEdit to={`/projects/${id}/edit/description`} />
      <DeleteModal onDelete={onDelete} />
    </div>
  );
};

const ProjectTableRow = ({ property, refetch }) => {
  if (!property) return;

  return (
    <tr className="text-gray-800">
      <TD className="">
        <ProjectsTableDetailsField property={property} />
      </TD>
      <TD className="capitalize">{property.category?.title}</TD>
      <TD className="capitalize">
        <AgentLink agent={property.agent} />
      </TD>
      <TD className="capitalize">
        <StatusIndicator status={property.status ? 'active' : 'inactive'} />
      </TD>
      <TD className="capitalize">{formatDate(property.created_on)}</TD>
      <TD className="capitalize">{formatDate(property.updated_on)}</TD>
      <TD className="capitalize">
        <ProjectTableActions property={property} refetch={refetch} />
      </TD>
    </tr>
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
        <TableSearch onFilter={onSearch} />
        <AddButton to="/projects/create/description">
          Add new projects
        </AddButton>
      </div>
    </div>
  );
};

const ProjectsTable = ({ projects, refetch, page_size, setPageNumber }) => {
  projects = projects?.results;
  const [filtered, setFiltered] = useState(projects);

  const headList = [
    'listing title',
    'category',
    'agent',
    'status',
    'created_on',
    'updated_on',
    'action',
  ];

  function onSearch(needle) {
    if (needle && needle.length > 0) {
      // console.log({ needle });
      setFiltered(
        /** Filter agents not already filtered items filteredAgents */
        projects.filter((property) => {
          const target = property.title.trim().toLowerCase();
          const value = needle.trim().toLowerCase();
          console.log({ target, value, result: target.includes(value) });
          return target.includes(value);
        }),
      );
    } else {
      setFiltered(projects);
    }
  }

  return (
    <div className="space-y-4">
      <TableTopSection onSearch={onSearch} />
      {
        // replace agent with your needle
        projects ? (
          <div className="bg-white p-4 space-y-4">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-gray-500 rtl:text-right">
                <THead>
                  <tr>
                    {headList.map((head, i) => {
                      return (
                        <TH
                          key={i}
                          className={twMerge(
                            i === 0 ? 'rounded-l-lg' : '',
                            i === headList.length - 1
                              ? 'rounded-r-lg'
                              : 'rounded-l-lg',
                          )}
                        >
                          {head}
                        </TH>
                      );
                    })}
                  </tr>
                </THead>
                <TBody>
                  {filtered
                    .sort(
                      (a, b) => new Date(b.updated_on) - new Date(a.updated_on),
                    )
                    .map((property, i) => {
                      return (
                        <Fragment key={i}>
                          <ProjectTableRow
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
              totalPages={new Array(Math.ceil(projects.length / page_size))
                .fill()
                .map((_, i) => i + 1)}
              currentPage={1}
              setPageNumber={setPageNumber}
              isNextExist={Boolean(projects.next)}
            />
            <TableSummary totalData={projects.length} />
          </div>
        ) : (
          <NoRecordsFound />
        )
      }
    </div>
  );
};

export default ProjectsTable;
