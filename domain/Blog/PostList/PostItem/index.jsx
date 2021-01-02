import { memo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import BlogTypes from 'types/blog';

const PostItem = ({ item }) => (
  <Link href={`/blog/${item.id}`}>
    <a>
      <div className="relative flex mb-6">
        <div className="relative w-48 h-36 rounded-md">
          <img
            src="/no-image.jpg"
            alt="no resource"
            className="absolute object-contain rounded-md"
          />
          <img
            src={item.image}
            alt={item.title}
            className="absolute object-contain rounded-md"
          />
        </div>
        <div className="w-96 font-mono p-1.5">
          <div className="text-2xl">{item.title}</div>
          <div className="text-base">{item.content}</div>
        </div>
      </div>
    </a>
  </Link>
);

PostItem.propTypes = {
  item: PropTypes.shape(BlogTypes.Post).isRequired,
};

export default memo(PostItem);
