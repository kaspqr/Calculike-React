import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { useEffect, useState } from "react";

const HiscoreUser = ({ user, gameType, i }) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState()

  const USER_URL = `/users/${user}`

  const fetchData = async () => {
    const response = await axiosPrivate.get(USER_URL);
    if (response) setCurrentUser(response.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", width: "100%", maxWidth: "500px" }}>
        <span>#{i + 1}</span>
        <u
          onClick={() => navigate(`/profiles/${currentUser.username}`)}
          className="ml-4"
          style={{ cursor: "pointer" }}
        >
          {currentUser?.username}
        </u>
        <div style={{ width: "100%" }} className="text-right">
          {currentUser?.[gameType]}
        </div>
      </div>
    </div>
  );
};

export default HiscoreUser;
