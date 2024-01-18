import { useNavigate } from "react-router-dom";

const HiscoreUser = ({ user, searchRef, i }) => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", width: "100%", maxWidth: "500px" }}>
        <span>#{i + 1}</span>
        <u
          onClick={() => navigate(`/profiles/${user.username}`)}
          className="ml-4"
          style={{ cursor: "pointer" }}
        >
          {user.username}
        </u>
        <div style={{ width: "100%" }} className="text-right">
          {user[searchRef.current]}
        </div>
      </div>
    </div>
  );
};

export default HiscoreUser;
