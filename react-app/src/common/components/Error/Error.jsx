import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  padding: '1rem';
`;
const ErrorText = styled.span`
  color: red;
`;

export default function Error({ message }) {
  return (
    <ErrorContainer>
      <ErrorText>{message}</ErrorText>
    </ErrorContainer>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};
