import {
  Box,
  Button,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { Dispatch, FormEvent, useState } from "react";

type PropsType = {
  vehicleId: number;
  setUpdateVehicleId: Dispatch<React.SetStateAction<number>>;
};

const UpdateCar = ({ vehicleId, setUpdateVehicleId }: PropsType) => {
  const accessToken = document.cookie.split("=")[1];
  const [vehicleType, setVehicleType] = useState("LIGHTWEIGHT_CAR");
  const handleChange = (event: SelectChangeEvent) => {
    setVehicleType(event.target.value as string);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      countryCode: data.get("countryCode"),
      licenceNumber: data.get("licenceNumber"),
      vehicleType,
    };
    setUpdateVehicleId(0);
    fetch(`http://${import.meta.env.VITE_API_SERVER}:7001/api/vehicles/${vehicleId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  return (
    <Box key={vehicleId} component="form" onSubmit={handleSubmit}>
      <FormLabel>차량아이디 {vehicleId}</FormLabel>
      <TextField required id="countryCode" label="국가 코드" name="countryCode" />
      <TextField required id="licenceNumber" label="라이센스 번호" name="licenceNumber" />
      <Select id="vehicleType" value={vehicleType} label="vehicleType" onChange={handleChange}>
        <MenuItem value="LIGHTWEIGHT_CAR">경차</MenuItem>
        <MenuItem value="SMALL_CAR">소형차</MenuItem>
        <MenuItem value="MEDIUM_CAR">중형차</MenuItem>
        <MenuItem value="LARGE_CAR">대형차</MenuItem>
        <MenuItem value="LARGE_TRUCK">대형 트럭</MenuItem>
        <MenuItem value="SPECIAL_TRUCK">특수 트럭</MenuItem>
      </Select>
      <Button type="submit" variant="contained">
        수정하기
      </Button>
    </Box>
  );
};

export default UpdateCar;
