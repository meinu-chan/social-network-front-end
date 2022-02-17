import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { getMe } from '../../api/userApi';
import Loader from '../../components/Loader';
import useApiRequest from '../../hooks/userApiRequest';

function Home() {
  const { requestFn: getMeApi, isLoading } = useApiRequest(getMe, {
    showSuccessMessage: false,
  });

  useEffect(() => {
    getMeApi({});
  }, [getMeApi]);

  return (
    <>
      {isLoading && <Loader fullScreen />}
      <Container>Home</Container>
    </>
  );
}

export default Home;
