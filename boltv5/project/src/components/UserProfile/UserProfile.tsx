import React from 'react';
import { useUser } from '../../hooks/useUser';
import { LogOut, User } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

const UserProfile: React.FC = () => {
  const { picture, email, firstName, fullName } = useUser();
  const { logout } = useAuth0();

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-3">
        {picture ? (
          <img 
            src={picture} 
            alt="Profile" 
            className="h-8 w-8 rounded-full object-cover border-2 border-purple-200"
          />
        ) : (
          <User className="h-8 w-8 p-1 rounded-full bg-purple-100 text-purple-600" />
        )}
        
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">{fullName}</span>
          <span className="text-xs text-gray-500">{email}</span>
        </div>
      </div>

      <button
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm 
                 leading-4 font-medium rounded-md text-purple-700 bg-purple-50 
                 hover:bg-purple-100 focus:outline-none transition"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </button>
    </div>
  );
};

export default UserProfile;