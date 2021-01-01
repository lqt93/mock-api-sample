import { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDebounce } from 'hooks/common';

const SearchBar = ({ onSearchChange }) => {
  const [inputValue, setInput] = useState('');
  const debouncedValue = useDebounce(inputValue, 600);
  useEffect(() => {
    onSearchChange(debouncedValue);
  }, [debouncedValue]);
  return (
    <div className="relative mr-6 my-2">
      <input
        type="search"
        value={inputValue}
        onChange={(e) => setInput(e.target.value)}
        className="bg-purple-white shadow rounded border-0 p-3"
        placeholder="Search"
      />
    </div>
  );
};

SearchBar.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};

export default memo(SearchBar);
