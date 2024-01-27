import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import UserCars from "../components/UserCars";

const Main = () => {
  const [status, setStatus] = useState<"unlogined" | "logined" | "admin">("unlogined");
  const [user, setUser] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const cookies: string = document.cookie;
    const accessToken = cookies.split(";")[0].split("=")[1];
    if (!accessToken) {
      setStatus("unlogined");
    } else {
      const { auth, username } = jwtDecode<{ auth: string; username: string }>(accessToken);
      setUser(username);
      if (auth.includes("ROLE_ADMIN")) {
        setStatus("admin");
      } else {
        setStatus("logined");
      }
    }
  }, []);

  const handleClick = () => {
    document.cookie = "";
  };

  return (
    <Layout>
      {status === "unlogined" ? (
        <>
          <Button variant="contained" onClick={() => navigate("/signin")}>
            로그인
          </Button>
          <Button variant="outlined" onClick={() => navigate("/signup")}>
            회원가입
          </Button>
        </>
      ) : (
        <>
          <Typography>
            환영합니다 {user}님 {status === "admin" && "(관리자)"}
          </Typography>
          <Button variant="outlined" onClick={handleClick}>
            로그아웃
          </Button>
          <UserCars />
        </>
      )}
    </Layout>
  );
};

export default Main;
