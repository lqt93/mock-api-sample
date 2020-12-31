import PropTypes from 'prop-types';

const PaginatorNumber = ({ number, isOn, onSelect }) => (
  <a
    href="#"
    onClick={() => onSelect(number)}
    className={`${isOn ? 'text-red-500' : 'text-gray-700'} relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50`}
  >
    {number}
  </a>
);

PaginatorNumber.propTypes = {
  number: PropTypes.number.isRequired,
  isOn: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default PaginatorNumber;
