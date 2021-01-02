import { memo } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/Dropdown';
import { SORT } from 'services/constants';

const SortBar = ({
  onSortByChange, onOrderChange, sortBy, order,
}) => (
  <div>
    Sort by:
    <Dropdown
      options={[SORT.CREATED_AT, SORT.TITLE]}
      defaultValue={sortBy}
      onChange={onSortByChange}
    />
    <Dropdown
      options={[SORT.ASC, SORT.DESC]}
      defaultValue={order}
      onChange={onOrderChange}
    />
  </div>
);

SortBar.propTypes = {
  onSortByChange: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
};

export default memo(SortBar);
