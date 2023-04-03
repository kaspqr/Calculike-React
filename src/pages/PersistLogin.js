import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from "../hooks/useAuth";

const Persistlogin = () => {
    const effectRan = useRef(true)
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (effectRan.current === true) {
            const verifyRefreshToken = async () => {
                try {
                    await refresh();
                } catch (err) {
                    console.error(err)
                } finally {
                    effectRan.current = false
                    setLoading(false)
                }
            }

            return () => {
                !auth?.user ? verifyRefreshToken() : effectRan.current = false;
            }
        }
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <Outlet />
    )
}

export default Persistlogin