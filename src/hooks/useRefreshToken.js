import { jwtDecode } from "jwt-decode"

import { axiosPrivate } from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresh = async () => {
    try { 
      const response = await axiosPrivate.get('/refresh', {
        withCredentials: true
      })

      const accessToken = response?.data?.accessToken

      if (!accessToken) {
        setAuth({})
        return null
      }

      const decoded = jwtDecode(accessToken)

      const {
        username,
        bio,
        userId
      } = decoded.UserInfo

      setAuth({ username, accessToken, userId, bio })

      return accessToken
    } catch (err) {
      console.error("Error refreshing token:", err)
      setAuth({})
      return null
    }
  }

  return refresh
}

export default useRefreshToken
