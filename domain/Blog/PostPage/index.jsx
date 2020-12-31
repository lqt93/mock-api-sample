import PropTypes from 'prop-types';
import BlogTypes from 'types/blog';

const PostPage = ({ post }) => (
  <div>
    <div>
      {post.id}
      {' - '}
      {post.title}
    </div>
    <div>
      {post.content}
    </div>
  </div>
);

PostPage.propTypes = {
  post: PropTypes.shape(BlogTypes.Post).isRequired,
};

export default PostPage;
