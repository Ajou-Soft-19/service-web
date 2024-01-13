import React, { ReactNode } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Container } from "@mui/material";

type PropTypes = {
  children: ReactNode;
};

const Layout = ({ children }: PropTypes) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Typography variant="h3" onClick={() => navigate("/")}>
        모세의 기적
      </Typography>
      {children}
    </Container>
  );
};

export default Layout;
