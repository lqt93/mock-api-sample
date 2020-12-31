import React, { useState, useEffect } from 'react';
import clientHttp from 'services/http/client';
import Loading from 'components/Loading';
import BlogList from './BlogList';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(async () => {
    try {
      const { data } = await clientHttp.get('/blogs');
      setBlogs(data);
    } catch (err) {
      console.log('err: ', err);
    }
  }, []);
  return (
    <div>
      <h1> Welcome Blogs </h1>
      {!blogs.length ? <Loading /> : <BlogList list={blogs} />}
    </div>
  );
};

export default Blogs;
