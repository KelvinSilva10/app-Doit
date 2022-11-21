import { ComponentType } from 'react';
import { Redirect, Route as ReactRoute, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';

interface iProps extends RouteProps {
  isPrivate?: boolean;
  component: ComponentType;
}

export const Route = ({
  isPrivate = false,
  component: Component,
  ...rest
}: iProps) => {
  const { accessToken } = useAuth();

  return (
    <ReactRoute
      {...rest}
      render={() =>
        isPrivate === !!accessToken ? (
          <Component />
        ) : (
          <Redirect to={isPrivate ? '/' : '/dashboard'} />
        )
      }
    />
  );
};
