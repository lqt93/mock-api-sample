import { useState, memo } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({
  options, onChange, defaultValue, className,
}) => {
  const [currentValue, setCurrentValue] = useState(defaultValue);
  return (
    <select
      className={`${className} border-gray-700 border-2 rounded-md`}
      value={currentValue}
      onChange={(e) => {
        const val = e.target.value;
        setCurrentValue(val);
        onChange(val);
      }}
    >
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

Dropdown.defaultProps = {
  options: [],
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default memo(Dropdown);
