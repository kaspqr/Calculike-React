import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Col, Row, Container } from "reactstrap";

import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars } from "@fortawesome/free-solid-svg-icons";

const Layout = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const [mainMenuVisible, setMainMenuVisible] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const LOGOUT_URL = "/logout";

  const handleLogout = async () => {
    await axios
      .get(LOGOUT_URL, { withCredentials: true })
      .then(() => {
        setAuth(null);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/");
  };

  document.addEventListener("click", function (e) {
    if (document.getElementById("menu-bars")) {
      const div = document.getElementById("menu-bars");
      if (!div.contains(e.target)) {
        setMainMenuVisible(false);
      }
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setMobileView(true);
      else {
        setMobileView(false);
        setMainMenuVisible(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container
      style={{ backgroundColor: "#ffffff", minHeight: "calc(100vh + 1rem)" }}
    >
      <div
        className="mt--3 pt-3"
        style={{
          backgroundColor: "#041219",
          height: "200px",
          borderRadius: "10px",
        }}
      >
        <div>
          {mobileView ? (
            <Row style={{ lineHeight: "65px" }}>
              <Col
                className="p-0"
                style={{ marginLeft: "40px", cursor: "pointer" }}
                onClick={() => setMainMenuVisible(!mainMenuVisible)}
                color="transparent"
              >
                <FontAwesomeIcon id="menu-bars" color="white" icon={faBars} />
              </Col>
              {auth?.username && (
                <Col
                  className="text-right mr-4 heading"
                  style={{ height: "50px", color: "white" }}
                  color="white"
                >
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/profiles/${auth?.username}`)}
                  >
                    {auth?.username}
                  </span>
                </Col>
              )}
            </Row>
          ) : (
            <>
              <Row style={{ lineHeight: "65px" }}>
                <span
                  className="ml-5"
                  onClick={() => navigate("/")}
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                >
                  <FontAwesomeIcon color="white" icon={faHome} />
                </span>
                <span
                  className="ml-4 heading"
                  onClick={() => navigate("/train")}
                  style={{
                    fontWeight: "bold",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  Play
                </span>
                <span
                  className="ml-4 heading"
                  onClick={() => navigate("/hiscores")}
                  style={{
                    fontWeight: "bold",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  Hiscores
                </span>
                <span
                  className="ml-4 heading"
                  onClick={() => navigate("/about")}
                  style={{
                    fontWeight: "bold",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  About
                </span>
                {auth?.username ? (
                  <>
                    <span
                      className="ml-4 heading"
                      onClick={() => navigate("/settings")}
                      style={{
                        fontWeight: "bold",
                        cursor: "pointer",
                        color: "white",
                      }}
                    >
                      Settings
                    </span>
                    <span
                      className="ml-4 heading"
                      onClick={handleLogout}
                      style={{
                        fontWeight: "bold",
                        cursor: "pointer",
                        color: "white",
                      }}
                    >
                      Logout
                    </span>
                    <Col className="text-right p-0 mr-5 heading">
                      <span
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          color: "white",
                        }}
                        onClick={() => navigate(`/profiles/${auth?.username}`)}
                      >
                        {auth?.username}
                      </span>
                    </Col>
                  </>
                ) : (
                  <>
                    <span
                      onClick={() => navigate("/register")}
                      className="ml-4 heading"
                      style={{
                        fontWeight: "bold",
                        cursor: "pointer",
                        color: "white",
                      }}
                    >
                      Register
                    </span>
                    <span
                      onClick={() => navigate("/login")}
                      className="ml-4 heading"
                      style={{
                        fontWeight: "bold",
                        cursor: "pointer",
                        color: "white",
                      }}
                    >
                      Login
                    </span>
                  </>
                )}
              </Row>
            </>
          )}
        </div>
        <div
          style={{
            display: !mainMenuVisible && "none",
            zIndex: mainMenuVisible && "1",
            position: "absolute",
            top: "50px",
            backgroundColor: "#041219",
            borderRadius: "10px",
            width: "calc(100% - 30px)",
          }}
        >
          <div
            className="m-0 p-0 px-4"
            style={{
              color: "white",
              height: "50px",
              lineHeight: "50px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Home
          </div>
          <div
            className="m-0 p-0 px-4"
            style={{
              color: "white",
              height: "50px",
              lineHeight: "50px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/train")}
          >
            Play
          </div>
          <div
            className="m-0 p-0 px-4"
            style={{
              color: "white",
              height: "50px",
              lineHeight: "50px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/hiscores")}
          >
            Hiscores
          </div>
          <div
            className="m-0 p-0 px-4"
            style={{
              color: "white",
              height: "50px",
              lineHeight: "50px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/about")}
          >
            About
          </div>
          {auth?.username ? (
            <>
              <div
                className="m-0 p-0 px-4"
                style={{
                  color: "white",
                  height: "50px",
                  lineHeight: "50px",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/settings")}
              >
                Settings
              </div>
              <div
                className="m-0 p-0 px-4"
                style={{
                  color: "white",
                  height: "50px",
                  lineHeight: "50px",
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              >
                Logout
              </div>
            </>
          ) : (
            <>
              <div
                className="m-0 p-0 px-4"
                style={{
                  color: "white",
                  height: "50px",
                  lineHeight: "50px",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/register")}
              >
                Register
              </div>
              <div
                className="m-0 p-0 px-4"
                style={{
                  color: "white",
                  height: "50px",
                  lineHeight: "50px",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </div>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </Container>
  );
};

export default Layout;
