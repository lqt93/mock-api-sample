import PropTypes from 'prop-types';
import '../styles/global.css';

function MyApp(props) {
  const { Component, pageProps } = props;
  return <Component pageProps={pageProps} />;
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.element.isRequired,
};

export default MyApp;
