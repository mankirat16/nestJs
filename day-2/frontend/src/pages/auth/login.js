import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  CssBaseline,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { UpdateContext } from "../../context";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [getOtp, setGetOtp] = useState(false);
  const { isLoggedIn, setIsLoggedIn, socketId } = useContext(UpdateContext);
  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const verifyOtp = () => {
    axios
      .post("http://localhost:4080/user/verify-otp", {
        email: email,
        otp: otp,
      })
      .then((res) => {
        console.log(res);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleOtp = () => {
    axios
      .post("http://localhost:4080/user/send-otp", {
        email: email,
        pwd: password,
      })
      .then((res) => {
        console.log(res);
        setGetOtp(true);
        toast("OTP sent to your active session!");
      })
      .catch((e) => {
        console.log(e);
        toast("No active sessions! Please login with password");
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4080/user/login",
        {
          email: email,
          pwd: password,
          socketId: socketId,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Toaster />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!getOtp ? (
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            <TextField
              margin="normal"
              fullWidth
              name="otp"
              label="Otp"
              type="number"
              id="otp"
              autoComplete="current-password"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}

          {!getOtp ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          ) : (
            <Box>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, maxWidth: "45%", mr: 1 }}
                onClick={verifyOtp}
              >
                Verify
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2, maxWidth: "45%" }}
                onClick={handleOtp}
              >
                Resend OTP
              </Button>
            </Box>
          )}
          <Typography variant="body2">
            New user? <Link to="/signup">Sign up here</Link>
          </Typography>

          {!getOtp && (
            <Button variant="outlined" onClick={handleOtp}>
              Log in Via OTP
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}
