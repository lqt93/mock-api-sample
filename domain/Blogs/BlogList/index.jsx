import PropTypes from 'prop-types';
import BlogTypes from 'types/blog';
import BlogItem from '../BlogItem';

const BlogList = ({ list }) => (
  <ul>{list && list.map((item) => <BlogItem key={item.id} item={item} />)}</ul>
);

BlogList.propTypes = {
  list: PropTypes.arrayOf(BlogTypes.BlogItemType).isRequired,
};

export default BlogList;
