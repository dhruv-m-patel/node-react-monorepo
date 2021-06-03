import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import Page from '../Page';

interface HomePageProps {
  getApiMessage: Function;
  messageFromApi?: string;
  isFetching: boolean;
  error?: string;
}

export default function HomePage({
  messageFromApi,
  isFetching = false,
  error,
  getApiMessage,
}: HomePageProps) {
  const [message, setMessage] = useState<string | undefined>();

  useEffect(() => {
    if (!isFetching && !error && !messageFromApi) {
      getApiMessage();
    } else if (messageFromApi && !message) {
      setMessage(messageFromApi);
    }
  }, [messageFromApi, isFetching, error, message, getApiMessage]);

  return (
    <Page>
      {isFetching && (
        <Typography variant="h5">Fetching message from API</Typography>
      )}
      {error ? (
        <Typography variant="h5">{error}</Typography>
      ) : (
        <Typography variant="h5">{message}</Typography>
      )}
    </Page>
  );
}
