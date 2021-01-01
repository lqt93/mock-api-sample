import {
  useState, useEffect, memo,
} from 'react';
import http from 'services/http';
import Loading from 'components/Loading';
import Paginator from 'components/Paginator';
import SearchBar from 'components/SearchBar';
import SortBar from 'components/SortBar';
import { usePrevious } from 'hooks/common';
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

const generateUrl = (searchTerm, page, sortBy, order, limit) => (searchTerm
  ? `/blogs?search=${searchTerm}&page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`
  : `/blogs?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`);

const MAX_LENGTH_POST_IN_PAGE = 10;

let TOTAL_PAGES = 0;
let MAX_LENGTH_PAGES = 0;

const getPostQueue = [];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState([]);
  const [fetchUrl, setFetchUrl] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('asc');
  const prevFetchUrl = usePrevious(fetchUrl);

  const getPosts = async (url) => {
    setLoading(true);
    const tempRange = rangeOfCurrentPage(page, TOTAL_PAGES, 5);
    setRange(tempRange);
    const { data } = await http.get(url);
    if (url === getPostQueue[0]) {
      setPosts(data);
      getPostQueue.length = 0;
    }
    setLoading(false);
  };

  useEffect(async () => {
    const { data } = await http.get('/blogs');
    MAX_LENGTH_PAGES = findStep(data.length, MAX_LENGTH_POST_IN_PAGE, true);
    TOTAL_PAGES = findStep(data.length, MAX_LENGTH_POST_IN_PAGE);
    const url = generateUrl('', page, sortBy, order, MAX_LENGTH_POST_IN_PAGE);
    setFetchUrl(url);
  }, []);

  const search = async (value) => {
    setPage(1);
    setLoading(true);
    const searchTerm = encodeURI(value.trim());
    const urlToGetTotalPages = `/blogs?${value ? 'search=' : ''}${searchTerm}`;
    const { data } = await http.get(urlToGetTotalPages);
    MAX_LENGTH_PAGES = findStep(data.length, MAX_LENGTH_POST_IN_PAGE, true);
    TOTAL_PAGES = findStep(data.length, MAX_LENGTH_POST_IN_PAGE);
    const tempRange = rangeOfCurrentPage(page, TOTAL_PAGES, 5);
    setRange(tempRange);
    const urlToGetFirstPagePosts = generateUrl(
      searchTerm,
      page,
      sortBy,
      order,
      MAX_LENGTH_POST_IN_PAGE,
    );
    setFetchUrl(urlToGetFirstPagePosts);
  };

  useEffect(() => {
    if (Boolean(fetchUrl) && prevFetchUrl !== fetchUrl) {
      getPostQueue.unshift(fetchUrl);
      getPosts(fetchUrl);
    }
  }, [fetchUrl]);

  useEffect(() => {
    setPage(1);
    setFetchUrl(generateUrl('', page, sortBy, order, MAX_LENGTH_POST_IN_PAGE));
  }, [order, sortBy, page]);

  return (
    <div>
      <h1> Welcome Blog </h1>
      <SearchBar onSearchChange={search} />
      {loading && <Loading />}
      {!loading && Boolean(posts.length) && (
        <div>
          <SortBar
            sortBy={sortBy}
            order={order}
            onSortByChange={setSortBy}
            onOrderChange={setOrder}
          />
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
      {!loading && !posts.length && <div> No result </div>}
    </div>
  );
};

export default memo(Blog);
