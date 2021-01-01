import { memo } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/Dropdown';

const SortBar = ({
  onSortByChange, onOrderChange, sortBy, order,
}) => (
  <div>
    Sort by:
    <Dropdown options={['createdAt', 'title']} defaultValue={sortBy} onChange={onSortByChange} />
    <Dropdown options={['asc', 'desc']} defaultValue={order} onChange={onOrderChange} />
  </div>
);

SortBar.propTypes = {
  onSortByChange: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
};

export default memo(SortBar);
