import React, { useEffect, useState, MouseEvent } from "react";
import { Button, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import UserCars from "../components/UserCars";

const Main = () => {
  const accessToken = document.cookie.split("=")[1];
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

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const buttonId = event.currentTarget.id;
    if (buttonId === "logout") {
      document.cookie = "";
    } else if (buttonId === "approval") {
      requestAdmin();
    } else if (buttonId === "admin") {
      navigate("/admin");
    }
  };

  const requestAdmin = () => {
    fetch(`http://${import.meta.env.VITE_API_SERVER}:7001/api/auth/roles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 400) {
          alert("이미 권한이 있습니다");
        } else {
          alert("승인 요청이 완료 되었습니다");
        }
        return res.json();
      })
      .then(() => {})
      .catch((error: Error) => {
        alert(`${error}`);
      });
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
          <Button variant="outlined" id="logout" onClick={handleClick}>
            로그아웃
          </Button>
          <Button variant="outlined" id="approval" onClick={handleClick}>
            응급 차량 승인 요청
          </Button>
          <Button variant="outlined" id="admin" onClick={handleClick}>
            관리자
          </Button>
          <UserCars />
        </>
      )}
    </Layout>
  );
};

export default Main;
