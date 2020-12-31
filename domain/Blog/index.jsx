import React, { useState, useEffect } from 'react';
import http from 'services/http';
import Loading from 'components/Loading';
import BlogList from './PostList';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  useEffect(async () => {
    const { data } = await http.get('/blogs');
    setPosts(data);
  }, []);
  return (
    <div>
      <h1> Welcome Blog </h1>
      {!posts.length ? <Loading /> : <BlogList list={posts} />}
    </div>
  );
};

export default Blog;
