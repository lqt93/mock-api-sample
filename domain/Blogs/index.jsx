import React from 'react';
import http from 'services/http';
import BlogList from './BlogList';

const Blogs = () => {
  React.useEffect(async () => {
    try {
      const { data } = await http.get('/blogs');
      console.log('>>>>>>>>>> ', data.length);
    } catch (err) {
      console.log('err: ', err);
    }
  }, []);
  return (
    <div>
      <h1> Welcome Blogs </h1>
      <BlogList />
    </div>
  );
};

export default Blogs;
