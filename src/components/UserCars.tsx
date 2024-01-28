import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, FormEvent, MouseEvent } from "react";
import UpdateCar from "./UpdateCar";

const UserCars = () => {
  const [cars, setCars] = useState<{ vehicleId: number; licenceNumber: string }[]>([]);
  const accessToken = document.cookie.split("=")[1];
  const [vehicleType, setVehicleType] = useState("LIGHTWEIGHT_CAR");
  const [updateVehicleId, setUpdateVehicleId] = useState(0);

  const handleChange = (event: SelectChangeEvent) => {
    setVehicleType(event.target.value as string);
  };

  const getCars = () => {
    fetch(`http://${import.meta.env.VITE_API_SERVER}:7001/api/vehicles/all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCars(data.data);
      });
  };

  useEffect(() => {
    getCars();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("vehicleType"));
    const body = {
      countryCode: data.get("countryCode"),
      licenceNumber: data.get("licenceNumber"),
      vehicleType,
    };
    fetch(`http://${import.meta.env.VITE_API_SERVER}:7001/api/vehicles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(() => {
        getCars();
      });
  };

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.id);
    const vehicleId = event.currentTarget.id;
    fetch(`http://${import.meta.env.VITE_API_SERVER}:7001/api/vehicles/${vehicleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        getCars();
      });
  };

  const handleUpdate = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.id);
    const vehicleId = event.currentTarget.id;
    setUpdateVehicleId(Number(vehicleId));
    getCars();
  };

  return (
    <Box sx={{ marginTop: "30px", marginBottom: "30px" }}>
      <Typography variant="h4">차량 추가하기</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <TextField required id="countryCode" label="국가 코드" name="countryCode" />
        <TextField required id="licenceNumber" label="라이센스 번호" name="licenceNumber" />
        <Select
          labelId="demo-simple-select-label"
          id="vehicleType"
          value={vehicleType}
          label="vehicleType"
          onChange={handleChange}
        >
          <MenuItem value="LIGHTWEIGHT_CAR">경차</MenuItem>
          <MenuItem value="SMALL_CAR">소형차</MenuItem>
          <MenuItem value="MEDIUM_CAR">중형차</MenuItem>
          <MenuItem value="LARGE_CAR">대형차</MenuItem>
          <MenuItem value="LARGE_TRUCK">대형 트럭</MenuItem>
          <MenuItem value="SPECIAL_TRUCK">특수 트럭</MenuItem>
        </Select>
        <Button type="submit" variant="contained">
          추가하기
        </Button>
      </Box>
      <Typography variant="h4">내 차량 목록</Typography>
      {cars.map((car) =>
        car.vehicleId === updateVehicleId ? (
          <UpdateCar vehicleId={car.vehicleId} setUpdateVehicleId={setUpdateVehicleId} />
        ) : (
          <Paper key={car.vehicleId} elevation={6} sx={{ marginTop: "30px", marginBottom: "30px" }}>
            <Typography>차량 아이디 {car.vehicleId} </Typography>
            <Typography>라이센스 번호 {car.licenceNumber}</Typography>
            <Button variant="outlined" onClick={handleUpdate} id={car.vehicleId.toString()}>
              수정하기
            </Button>
            <Button variant="outlined" onClick={handleDelete} id={car.vehicleId.toString()}>
              삭제하기
            </Button>
          </Paper>
        )
      )}
    </Box>
  );
};

export default UserCars;
