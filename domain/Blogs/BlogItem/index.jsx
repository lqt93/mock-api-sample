import PropTypes from 'prop-types';
import BlogTypes from 'types/blog';

const BlogItem = ({ item }) => (
  <div>
    <div>
      {item.id}
      {' - '}
      {item.title}
    </div>
  </div>
);

BlogItem.propTypes = {
  item: PropTypes.instanceOf(BlogTypes.BlogItemType).isRequired,
};

export default BlogItem;
