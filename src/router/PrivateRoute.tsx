import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { appLinks } from './routes';

interface IProps {
  isAuthenticated: boolean;
}

const PrivateRoute = ({ isAuthenticated }: IProps) =>
  isAuthenticated ? <Outlet /> : <Navigate to={appLinks.auth.link} />;

export default PrivateRoute;
