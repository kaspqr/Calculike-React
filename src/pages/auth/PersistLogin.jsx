import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import RingLoader from "react-spinners/RingLoader";

const Persistlogin = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (!auth?.username) verifyRefreshToken();
    else setLoading(false);
  }, [auth?.username, refresh]);

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

  return <Outlet />;
};

export default Persistlogin;
