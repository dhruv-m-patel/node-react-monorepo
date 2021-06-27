import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 1rem;
`;

const MessageContainer = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
`;

export default function Loader({ message, children, ...props }) {
  return (
    <Container>
      <Spinner animation="border" role="status" {...props} />
      {!!message && <MessageContainer>{message}</MessageContainer>}
      {children}
    </Container>
  );
}

Loader.propTypes = {
  message: PropTypes.string,
  children: PropTypes.node,
};

Loader.defaultProps = {
  message: undefined,
  children: undefined,
};
