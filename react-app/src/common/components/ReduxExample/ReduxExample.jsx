import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import Error from '../Error';
import Page from '../Page';

export default function ReduxExample({
  isFetching,
  error,
  data,
  fetchTestData,
}) {
  useEffect(() => {
    if (!isFetching && !error && (!data || !data.length)) {
      fetchTestData();
    }
  }, [isFetching, error, data]);

  return (
    <Page>
      <h4>An example page showing Redux integration</h4>
      <br />
      <br />
      {isFetching && <Loader message="Fetching data" />}
      {!!error && <Error message={error} />}
      {data && data.length > 0 && (
        <React.Fragment>
          <h5>Following data was fetched using Redux</h5>
          <ul>
            {data.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </React.Fragment>
      )}
      <br />
      <br />
      <Link to="/">View Home Page</Link>
    </Page>
  );
}

ReduxExample.propTypes = {
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.string),
  fetchTestData: PropTypes.func,
};

ReduxExample.defaultProps = {
  isFetching: false,
  error: undefined,
  data: undefined,
  fetchTestData: () => {},
};
