import { useAuth0 } from '@auth0/auth0-react';

export const useUser = () => {
  const { user, isLoading, isAuthenticated } = useAuth0();

  return {
    user,
    isLoading,
    isAuthenticated,
    firstName: user?.given_name || user?.name?.split(' ')[0] || 'User',
    email: user?.email,
    picture: user?.picture,
    fullName: user?.name,
  };
};