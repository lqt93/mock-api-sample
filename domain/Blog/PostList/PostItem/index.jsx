import PropTypes from 'prop-types';
import Link from 'next/link';
import BlogTypes from 'types/blog';

const PostItem = ({ item }) => (
  <div>
    <Link href={`/blog/${item.id}`}>
      <a>
        {item.id}
        {' - '}
        {item.title}
      </a>
    </Link>
  </div>
);

PostItem.propTypes = {
  item: PropTypes.shape(BlogTypes.Post).isRequired,
};

export default PostItem;
