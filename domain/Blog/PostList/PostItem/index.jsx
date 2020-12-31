import PropTypes from 'prop-types';
import BlogTypes from 'types/blog';

const PostItem = ({ item }) => (
  <div>
    <div>
      {item.id}
      {' - '}
      {item.title}
    </div>
  </div>
);

PostItem.propTypes = {
  item: PropTypes.shape(BlogTypes.Post).isRequired,
};

export default PostItem;
