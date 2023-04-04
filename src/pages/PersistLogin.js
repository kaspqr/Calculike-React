import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from "../hooks/useAuth";
import { RingLoader } from "react-spinners";

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
      
        if (!auth?.user) {
          verifyRefreshToken();
        } else {
          setLoading(false);
        }
      }, [auth?.user, refresh]);

    if (loading) {
        return <RingLoader />
    }

    return (
        <Outlet />
    )
}

export default Persistlogin