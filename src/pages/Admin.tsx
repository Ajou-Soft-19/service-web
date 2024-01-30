import React, { useEffect, useState, MouseEvent } from "react";
import Layout from "../components/Layout";
import { Button, Paper, Typography } from "@mui/material";

const Admin = () => {
  const [approvedCars, setApprovedCars] = useState<{ memberId: string }[]>([]);
  const [notApprovedCars, setNotApprovedCars] = useState<{ memberId: string }[]>([]);
  const accessToken = document.cookie.split("=")[1];

  const getApprovedCars = () => {
    fetch(`http://${import.meta.env.VITE_API_SERVER}:7001/api/auth/roles/emergency`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setApprovedCars(data.data);
      })
      .catch((error: Error) => {
        alert(`${error}`);
      });
  };

  const getNotApprovedCars = () => {
    fetch(`http://${import.meta.env.VITE_API_SERVER}:7001/api/auth/roles/request`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotApprovedCars(data.data);
      })
      .catch((error: Error) => {
        alert(`${error}`);
      });
  };

  useEffect(() => {
    getApprovedCars();
    getNotApprovedCars();
  }, []);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const buttonId = event.currentTarget.id;
    const memberId = event.currentTarget.dataset.memberid || "";
    if (buttonId === "remove") {
      removeCar(memberId);
    } else if (buttonId === "approve") {
      approveCar(memberId);
    } else if (buttonId === "reject") {
      rejectCar(memberId);
    }
  };

  const removeCar = (memberId: string) => {
    fetch(`http://${import.meta.env.VITE_API_SERVER}:7001/api/auth/roles/delete/${memberId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        getApprovedCars();
        getNotApprovedCars();
      })
      .catch((error: Error) => {
        alert(`${error}`);
      });
  };

  const approveCar = (memberId: string) => {
    fetch(`http://${import.meta.env.VITE_API_SERVER}:7001/api/auth/roles/approve/${memberId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        getApprovedCars();
        getNotApprovedCars();
      })
      .catch((error: Error) => {
        alert(`${error}`);
      });
  };

  const rejectCar = (memberId: string) => {
    fetch(`http://${import.meta.env.VITE_API_SERVER}:7001/api/auth/roles/reject/${memberId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        getApprovedCars();
        getNotApprovedCars();
      })
      .catch((error: Error) => {
        alert(`${error}`);
      });
  };

  return (
    <Layout>
      <Typography variant="h4">응급 차량 권한 요청한 유저 리스트</Typography>
      {notApprovedCars.map((car) => (
        <Paper key={car.memberId} elevation={5} sx={{ marginTop: "20px", marginBottom: "20px" }}>
          <Typography>유저 아이디: {car.memberId}</Typography>
          <Button
            id="remove"
            data-memberId={car.memberId}
            variant="contained"
            onClick={handleClick}
          >
            제거하기
          </Button>
        </Paper>
      ))}
      <Typography variant="h4">응급 차량 권한 가지고 있는 유저 리스트</Typography>
      {approvedCars.map((car) => (
        <Paper key={car.memberId} elevation={5} sx={{ marginTop: "20px", marginBottom: "20px" }}>
          <Typography>유저 아이디: {car.memberId}</Typography>
          <Button
            id="approve"
            data-memberId={car.memberId}
            variant="contained"
            onClick={handleClick}
          >
            승인하기
          </Button>
          <Button
            id="reject"
            data-memberId={car.memberId}
            variant="contained"
            onClick={handleClick}
          >
            거절하기
          </Button>
        </Paper>
      ))}
    </Layout>
  );
};

export default Admin;
