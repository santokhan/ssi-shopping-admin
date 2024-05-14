import React from 'react';
import { Outlet } from 'react-router-dom';

const BlogsLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default BlogsLayout;
