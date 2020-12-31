import { useState, useEffect } from 'react';
import http from 'services/http';
import Loading from 'components/Loading';
import Paginator from 'components/Paginator';
import BlogList from './PostList';

const findStep = (page, maxLength) => {
  if (page < maxLength) return 1;
  return Math.ceil(page / maxLength);
};

const rangeOfCurrentPage = (currentPage, totalPages, maxLength) => {
  const currentStep = findStep(currentPage, maxLength);
  const maxStep = findStep(totalPages, maxLength);
  const tempRangeMax = currentStep * maxLength;
  const rangeMax = currentStep === maxStep && tempRangeMax > totalPages
    ? totalPages
    : tempRangeMax;
  const rangeMin = tempRangeMax - maxLength + 1;
  const range = [];
  for (let i = rangeMin; i <= rangeMax; i += 1) {
    range.push(i);
  }
  return range;
};

const TOTAL_PAGES = 11;
const MAX_LENGTH = 3;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(async () => {
    const { data } = await http.get('/blogs');
    setPosts(data);
  }, []);
  const range = rangeOfCurrentPage(page, TOTAL_PAGES, MAX_LENGTH);

  return (
    <div>
      <h1> Welcome Blog </h1>
      <Paginator
        page={page}
        totalPages={TOTAL_PAGES}
        onSelectPage={setPage}
        range={range}
        maxLength={MAX_LENGTH}
      />
      {!posts.length ? <Loading /> : <BlogList list={posts} />}
    </div>
  );
};

export default Blog;
