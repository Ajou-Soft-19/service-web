import { Stack, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { ChangeEvent, useState, useCallback } from "react";

const LoginForm = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldId = event.target.id;
    if (fieldId == "id") {
      setId(event.target.value);
    } else if (fieldId == "password") {
      setPassword(event.target.value);
    } else {
      throw new Error("부적절한 값이 입력되었습니다");
    }
  };
  const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);

  const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }, []);

  const handleSubmit = () => {
    console.log({ id, password });
  };

  return (
    <Stack width={300} mt={10} component="form" spacing={2} noValidate autoComplete="off">
      <TextField id="id" label={"아이디"} onChange={handleChange} value={id} />
      <TextField
        id="password"
        type={showPassword ? "text" : "password"}
        label={"비밀번호"}
        value={password}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button onClick={handleSubmit} variant="contained">
        제출하기
      </Button>
    </Stack>
  );
};

export default LoginForm;
