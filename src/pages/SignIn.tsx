import React, { FormEvent } from "react";
import Layout from "../components/Layout";
import { FormControl, FormLabel, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const body = {
      email: data.get("email"),
      password: data.get("password"),
      loginType: "EMAIL_PW",
    };
    fetch(`http://${import.meta.env.VITE_API_SERVER}:7000/api/account/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data: { data: { accessToken: string } }) => {
        document.cookie = `accessToken=${data.data.accessToken}; Path=/`;
        navigate("/");
      });
  };
  return (
    <Layout>
      <FormControl>
        <Box component="form" onSubmit={handleSubmit}>
          <FormLabel id="demo-row-radio-buttons-group-label">로그인</FormLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
        </Box>
      </FormControl>
    </Layout>
  );
};

export default SignIn;
