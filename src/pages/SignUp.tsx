import React, { FormEvent } from "react";
import Layout from "../components/Layout";
import { FormControl, FormLabel, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      email: data.get("email"),
      password: data.get("password"),
      username: data.get("username"),
      phoneNumber: data.get("phoneNumber"),
      loginType: "EMAIL_PW",
    };
    fetch(`http://${import.meta.env.VITE_API_SERVER}:7000/api/account/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/");
      });
  };

  return (
    <Layout>
      <FormControl>
        <Box component="form" onSubmit={handleSubmit}>
          <FormLabel id="demo-row-radio-buttons-group-label">회원가입</FormLabel>
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
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="phoneNumber"
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
            Sign Up
          </Button>
        </Box>
      </FormControl>
    </Layout>
  );
};

export default SignUp;
