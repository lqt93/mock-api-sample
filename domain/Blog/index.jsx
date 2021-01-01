import { useState, useEffect, memo } from 'react';
import http from 'services/http';
import Loading from 'components/Loading';
import Paginator from 'components/Paginator';
import BlogList from './PostList';

const findStep = (page, maxLength, isPage = false) => {
  if (page < maxLength) return 1;
  return isPage ? Math.floor(page / maxLength) : Math.ceil(page / maxLength);
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

// const postRangeInCurrentPage = (page, totalItems, maxLength) => {
//   const rangeEndTemp = page * maxLength;
//   const rangeStart = rangeEndTemp - maxLength;
//   const rangeEnd = rangeEndTemp > totalItems ? totalItems : rangeEndTemp;
//   return [rangeStart, rangeEnd];
// };

const MAX_LENGTH_POST_IN_PAGE = 10;

let TOTAL_PAGES = 0;
let MAX_LENGTH_PAGES = 0;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState([]);

  const getPosts = async () => {
    setLoading(true);
    const tempRange = rangeOfCurrentPage(page, TOTAL_PAGES, 5);
    setRange(tempRange);
    const { data } = await http.get(`/blogs?page=${page}&limit=${MAX_LENGTH_POST_IN_PAGE}`);
    setPosts(data);
    setLoading(false);
  };

  useEffect(async () => {
    const { data } = await http.get('/blogs');
    MAX_LENGTH_PAGES = findStep(
      data.length,
      MAX_LENGTH_POST_IN_PAGE,
      true,
    );
    TOTAL_PAGES = findStep(data.length, MAX_LENGTH_POST_IN_PAGE);
    await getPosts();
    setLoading(false);
  }, []);

  useEffect(async () => {
    await getPosts();
  }, [page]);

  return (
    <div>
      <h1> Welcome Blog </h1>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <BlogList list={posts} />
          <Paginator
            page={page}
            totalPages={TOTAL_PAGES}
            onSelectPage={setPage}
            range={range}
            maxLength={MAX_LENGTH_PAGES}
          />
        </div>
      )}
    </div>
  );
};

export default memo(Blog);
