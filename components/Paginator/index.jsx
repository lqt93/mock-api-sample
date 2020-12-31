// import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PaginatorNumber from './PaginatorNumber';
import PaginatorArrow from './PaginatorArrow';

const Paginator = ({
  totalPages, page, onSelectPage, range,
}) => {
  // const [currentPage, setCurrentPage] = useState(0);
  // useEffect(async () => {}, []);
  const onSelectArrow = (right) => {
    let chosenNumber = page;
    if (right) {
      const temp = page + 1;
      chosenNumber = temp > totalPages ? totalPages : temp;
    } else {
      const temp = page - 1;
      chosenNumber = temp < 1 ? 1 : temp;
    }
    onSelectPage(chosenNumber);
  };

  return (
    <div
      className="relative z-0 inline-flex shadow-sm -space-x-px"
      aria-label="Pagination"
    >
      <PaginatorArrow right={false} onSelect={onSelectArrow} />
      {range && range.map((item) => (
        <PaginatorNumber
          key={item}
          number={item}
          isOn={item === page}
          onSelect={onSelectPage}
        />
      ))}
      <PaginatorArrow right onSelect={onSelectArrow} />
    </div>
  );
};

Paginator.defaultProps = {
  range: [],
};

Paginator.propTypes = {
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onSelectPage: PropTypes.func.isRequired,
  range: PropTypes.arrayOf(PropTypes.number),
};

export default Paginator;
