/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import '../styles/global.css';

const MyApp = (props) => {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.any.isRequired,
};

export default MyApp;
