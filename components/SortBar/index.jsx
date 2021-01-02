import { memo } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/Dropdown';
import { SORT } from 'services/constants';

const SortBar = ({
  onSortByChange, onOrderChange, sortBy, order,
}) => (
  <div className="font-mono my-3 mx-1">
    <text className="font-bold"> Sort by: </text>
    <Dropdown
      options={[SORT.CREATED_AT, SORT.TITLE]}
      defaultValue={sortBy}
      onChange={onSortByChange}
      className="mr-5"
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
