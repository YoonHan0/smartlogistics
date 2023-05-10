import React, { useState } from "react";
import logo from "../../assets/img/logo.png";
import backImg from "../../assets/img/backimg.png";
import sha256 from "sha256";
import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  Input,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";

const Login = ({ handleLogin }) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleButtonClick = () => {
    setIsVisible(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser();
  };

  // user login
  const loginUser = async () => {
    const data = {
      id: document.getElementById("id").value,
      password: sha256(document.getElementById("password").value),
    };
    try {
      const response = await fetch("/api/sign/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      if (json.result !== "success") {
        handleButtonClick();
        throw new Error(`${json.result} ${json.message}`);
      }

      if (json.data === null) {
        console.log("login failed....");
        alert("login failed....");
        return;
      }

      const jwtToken = response.headers
        .get("Authorization")
        .replace("Bearer ", "");

      const refreshToken = response.headers.get("refresh");

      handleLogin(jwtToken, refreshToken, json.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 0,
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={10}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{ marginLeft: 5 }}
          >
            <Box
              sx={{
                my: 5,
                mx: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={logo}
                sx={{ height: "90px", width: "100px" }}
              />
              {/* <Typography component="h1" variant="h5"> */}
              <Typography
                variant="h5"
                color="#0573FC"
                sx={{
                  paddingBottom: 1,
                  fontFamily: "Black Han Sans, sans-serif",
                }}
              >
                SMARTLOGISTICS
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: "1.2rem" },
                    "& .MuiInputBase-input:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 100px #fff inset",
                      WebkitTextFillColor: "inherit",
                    },
                  }}
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  id="id"
                  name="id"
                  autoComplete="id"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: "1.2rem" },
                    "& .MuiInputBase-input:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 100px #fff inset",
                      WebkitTextFillColor: "inherit",
                    },
                  }}
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <Box
                  sx={{
                    fontSize: "12px",
                    color: "red",
                    display: isVisible ? "block" : "none",
                  }}
                >
                  아이디 또는 비밀번호가 일치하지 않습니다.
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item></Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid xs={false} sx={{ zIndex: -2 }}>
            <Box sx={{ marginLeft: "300px", marginTop: "-515px" }}>
              <Box
                component="img"
                src={backImg}
                sx={{
                  width: "500px",
                  height: "550px",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
