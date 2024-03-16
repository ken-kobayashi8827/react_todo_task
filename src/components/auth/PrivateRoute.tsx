import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const { user } = useAuthContext() || {};
  if (!user) {
    return <Navigate to='/login' />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
