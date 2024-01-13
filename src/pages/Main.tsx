import React from "react";
import { Button } from "@mui/material";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Button variant="contained" onClick={() => navigate("/signin")}>
        로그인
      </Button>
      <Button variant="outlined" onClick={() => navigate("/signup")}>
        회원가입
      </Button>
    </Layout>
  );
};

export default Main;
