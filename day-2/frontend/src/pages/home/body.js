import React, { useEffect } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Body() {
  const navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <Container>
      <Navbar />
      <Typography variant="h4" component="h1" gutterBottom marginTop={10}>
        Welcome to Home Page
      </Typography>

      <Grid container spacing={4} marginTop={2}></Grid>
      <ToastContainer />
    </Container>
  );
}
