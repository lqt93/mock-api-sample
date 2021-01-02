import { useState, useEffect, memo } from 'react';
import http from 'services/http';
import Loading from 'components/Loading';
import Paginator from 'components/Paginator';
import SearchBar from 'components/SearchBar';
import SortBar from 'components/SortBar';
import { usePrevious } from 'hooks/common';
import BlogList from './PostList';
import { calculateRange, rangeOfCurrentPage, generateUrl } from './util';

const POSTS_PER_PAGE = 10;
const getPostQueue = [];
let TOTAL_PAGES = 0;
let PAGES_PER_DISPLAY_TIME = 0;

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
    const { data } = await http.get(url);
    if (url === getPostQueue[0]) {
      setPosts(data);
      getPostQueue.length = 0;
    }
    setLoading(false);
  };

  const getFirstPagePosts = (totalItemsNumber, urlToGetFirstPagePosts) => {
    PAGES_PER_DISPLAY_TIME = calculateRange(
      totalItemsNumber,
      POSTS_PER_PAGE,
      true,
    );
    TOTAL_PAGES = calculateRange(totalItemsNumber, POSTS_PER_PAGE);
    setRange(rangeOfCurrentPage(page, TOTAL_PAGES, PAGES_PER_DISPLAY_TIME));
    setFetchUrl(urlToGetFirstPagePosts);
  };

  useEffect(async () => {
    const { data } = await http.get('/blogs');
    const totalItemsNumber = data.length;
    getFirstPagePosts(
      totalItemsNumber,
      generateUrl('', page, sortBy, order, POSTS_PER_PAGE),
    );
  }, []);

  const search = async (value) => {
    setPage(1);
    setLoading(true);
    const searchTerm = encodeURI(value.trim());
    const { data } = await http.get(
      `/blogs?${value ? 'search=' : ''}${searchTerm}`,
    );
    const totalItemsNumber = data.length;
    getFirstPagePosts(
      totalItemsNumber,
      generateUrl(searchTerm, page, sortBy, order, POSTS_PER_PAGE),
    );
  };

  useEffect(() => {
    if (Boolean(fetchUrl) && prevFetchUrl !== fetchUrl) {
      getPostQueue.unshift(fetchUrl);
      getPosts(fetchUrl);
    }
  }, [fetchUrl]);

  useEffect(() => {
    setFetchUrl(generateUrl('', page, sortBy, order, POSTS_PER_PAGE));
  }, [order, sortBy, page]);

  return (
    <div className="w-screen">
      <h1 className="text-blue-700 text-7xl font-mono text-center">
        Mock API Blog
      </h1>
      <div className="flex justify-center items-center my-5 w-full">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-8/12">
            <SearchBar onSearchChange={search} />
            <SortBar
              sortBy={sortBy}
              order={order}
              onSortByChange={setSortBy}
              onOrderChange={setOrder}
            />
          </div>
          {loading && <Loading />}
          {!loading && Boolean(posts.length) && (
            <div className="w-8/12">
              <BlogList list={posts} />
              <Paginator
                page={page}
                totalPages={TOTAL_PAGES}
                onSelectPage={setPage}
                range={range}
                maxLength={PAGES_PER_DISPLAY_TIME}
              />
            </div>
          )}
          {!loading && !posts.length && <div> No result </div>}
        </div>
      </div>
    </div>
  );
};

export default memo(Blog);
