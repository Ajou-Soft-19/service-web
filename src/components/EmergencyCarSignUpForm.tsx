import {
  Stack,
  TextField,
  Select,
  SelectChangeEvent,
  MenuItem,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { ChangeEvent, useState, useCallback } from "react";

const EmergencyCarForm = () => {
  const [carKind, setCarKind] = useState<string>("ambulance");
  const [id, setId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSelect = (event: SelectChangeEvent<string>) => {
    setCarKind(event.target.value);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldId = event.target.id;
    if (fieldId == "id") {
      setId(event.target.value);
    } else if (fieldId == "email") {
      setEmail(event.target.value);
    } else if (fieldId == "name") {
      setName(event.target.value);
    } else if (fieldId == "password") {
      setPassword(event.target.value);
    } else if (fieldId == "passwordCheck") {
      setPasswordCheck(event.target.value);
    } else if (fieldId == "phoneNumber") {
      setPhoneNumber(event.target.value);
    } else {
      throw new Error("부적절한 값이 입력되었습니다");
    }
  };
  const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);

  const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }, []);

  const handleSubmit = () => {
    console.log({ id, email, name, password, passwordCheck, phoneNumber, carKind });
  };

  return (
    <Stack component="form" spacing={2} noValidate autoComplete="off">
      <TextField id="id" label={"아이디"} onChange={handleChange} value={id} />
      <TextField id="email" label={"이메일"} onChange={handleChange} value={email} />
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
      <TextField
        id="passwordCheck"
        type={showPassword ? "text" : "password"}
        label={"비밀번호 확인"}
        value={passwordCheck}
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
      <TextField id="name" label={"이름"} onChange={handleChange} value={name} />
      <TextField
        id="phoneNumber"
        helperText="-(하이픈) 없이 숫자만 입력해주세요"
        label={"전화번호"}
        value={phoneNumber}
        onChange={handleChange}
      />
      <Select value={carKind} label={"Age"} onChange={handleSelect}>
        <MenuItem value={"ambulance"}>구급차</MenuItem>
        <MenuItem value={"fireTruck"}>소방차</MenuItem>
        <MenuItem value={"policeCar"}>경찰차</MenuItem>
      </Select>
      <Button onClick={handleSubmit} variant="contained">
        제출하기
      </Button>
    </Stack>
  );
};

export default EmergencyCarForm;
