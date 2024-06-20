import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import DataTable from '../components/DataTable';

const Gallery: React.FC = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <DataTable />
    </div>
  );
};

export default Gallery;

