import { useContext, useState } from 'react';
import Spinner from '../../components/loader/Spinner';
import BlogsTable from '../../blocks/table/BlogsTable';
import BlogsProvider, { BlogsContext } from '../../context/BlogsContext';

const Blogs = () => {
  const [page, setPage] = useState(1);
  const page_size = 10;
  const { loading } = useContext(BlogsContext);

  function setPageNumber(numOrIndex = page) {
    if (numOrIndex === 'next') {
      setPage((prev) => prev + 1);
    }
    if (numOrIndex === 'prev') {
      setPage((prev) => prev - 1);
    }
    if (typeof numOrIndex === 'number') {
      setPage(numOrIndex);
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    <BlogsTable setPageNumber={setPageNumber} page_size={page_size} />
  );
};

const BlogsPage = () => {
  return (
    <BlogsProvider>
      <Blogs />
    </BlogsProvider>
  );
};

export default BlogsPage;
