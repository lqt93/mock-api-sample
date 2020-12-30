import PropTypes from 'prop-types';
import '../styles/global.css';

const MyApp = (props) => {
  const { Component } = props;
  return <Component />;
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
};

export default MyApp;
