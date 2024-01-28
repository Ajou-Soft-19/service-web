import {
  Box,
  Button,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { Dispatch, useState } from "react";

type PropsType = {
  vehicleId: number;
  setUpdateVehicleId: Dispatch<React.SetStateAction<number>>;
};

const UpdateCar = ({ vehicleId, setUpdateVehicleId }: PropsType) => {
  const [vehicleType, setVehicleType] = useState("LIGHTWEIGHT_CAR");
  const handleChange = (event: SelectChangeEvent) => {
    setVehicleType(event.target.value as string);
  };

  const handleSubmit = () => {
    setUpdateVehicleId(0);
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
