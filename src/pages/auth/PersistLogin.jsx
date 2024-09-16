import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";

import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

const Persistlogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const refresh = useRefreshToken();
  const { setAuth } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      const newAccessToken = await refresh();

      if (!newAccessToken) {
        setAuth({})
        navigate('/login')
      }
      
      setLoading(false);
    };

    verifyRefreshToken();
    setLoading(false);
  }, [location?.pathname]);

  if (loading) {
    return (
      <div id="loading-spinner">
        <RingLoader
          color="#000"
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return <Outlet />
};

export default Persistlogin
