import { useEffect, useState } from 'react';
import api from '../../axios/api';
import Spinner from '../../components/loader/Spinner';
import { useParams, useSearchParams } from 'react-router-dom';
import filterListById from '../../utils/filterList';
import ProjectsTable from '../../blocks/table/ProjectsTable';

const ProjectPage = () => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const page_size = 10;
  const params = useParams();
  const [usp] = useSearchParams();
  const currentPage = parseInt(usp.get('page')) || 1;

  function fetchData(page) {
    setLoading(true);
    api
      .get('projects/', {
        params: {
          page: page,
          page_size: page_size,
        },
      })
      .then((res) => {
        if (typeof res.data === 'object') {
          const data = res.data;

          if (params.id && Array.isArray(data.results)) {
            data.results = filterListById(data.results, params.id);
            setProjects(data);
          } else {
            setProjects(data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (currentPage) {
      fetchData(parseInt(currentPage));
    }
  }, [currentPage]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <ProjectsTable
          projects={projects}
          refetch={() => {
            fetchData(currentPage);
          }}
        />
      )}
    </>
  );
};

export default ProjectPage;
