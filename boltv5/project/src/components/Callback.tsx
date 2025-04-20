import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const { handleRedirectCallback } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const processCallback = async () => {
      try {
        await handleRedirectCallback();
        navigate('/main'); // Changed from '/dashboard' to '/main'
      } catch (error) {
        console.error('Error handling callback:', error);
        navigate('/');
      }
    };

    processCallback();
  }, [handleRedirectCallback, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Completing login...
    </div>
  );
};

export default Callback;
