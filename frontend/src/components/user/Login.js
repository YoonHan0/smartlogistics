import React, { useState } from 'react';
import logo from '../../assets/img/logo.png';
import backImg from '../../assets/img/backimg.png';
import sha256 from 'sha256';
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
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import styles from './style.css';
import zIndex from '@mui/material/styles/zIndex';

const Login = ({ handleLogin }) => {
  const [rotate, setRotate] = useState(0);

  const handleRotate = () => {
    setRotate(rotate + 90);
  };
  // const [rotate, setRotate] = useState(false);

  // const handleRotate = () => {
  //   setRotate(true);
  // };

  const [rotateY, setRotateY] = useState(0);
  const [rotateX, setRotateX] = useState(0);

  const handleRotate2 = () => {
    //setRotateY(rotateY + 90);
    setRotateX(rotateX + 90);
  };

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
      id: document.getElementById('id').value,
      password: sha256(document.getElementById('password').value),
    };
    try {
      const response = await fetch('/api/sign/login', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      if (json.result !== 'success') {
        handleButtonClick();
        throw new Error(`${json.result} ${json.message}`);
      }

      if (json.data === null) {
        console.log('login failed....');
        alert('login failed....');
        return;
      }

      const jwtToken = response.headers.get('Authorization').replace('Bearer ', '');

      const refreshToken = response.headers.get('refresh');

      handleLogin(jwtToken, refreshToken, json.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Container
      // sx={{ transform: `rotateY(${rotate}deg)`, transition: 'transform 0.5s ease-in-out' }}
      // className={styles.rotate}
      component="main"
      maxWidth="md"
    >
      <Box
        sx={{
          marginTop: 0,
        }}
      >
        {/* <Grid container>
          <CssBaseline />
          <Grid item xs={10} sm={8} md={5} component={Paper} elevation={6} square sx={{ marginLeft: 3, height: '450px' }}> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
            width: '350px',
            height: '450px',
            backgroundColor: '#fff',
            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
            border: '1px solid #C4C4C4',
          }}
        >
          <Box component="img" src={logo} sx={{ height: '90px', width: '100px', marginTop: '30px' }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50px',
            }}
          >
            <Typography
              sx={{
                fontSize: '22px',
                color: '#117AEF',
                fontFamily: 'sans-serif',
                lineHeight: '90px',
                fontWeight: 580,
                pt: '5px',
              }}
            >
              SMART
            </Typography>
            <Typography
              sx={{
                fontSize: '22px',
                color: '#000',
                fontFamily: 'sans-serif',
                lineHeight: '90px',
                fontWeight: 580,
                pt: '5px',
              }}
            >
              LOGISTRICS
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ margin: '0 40px' }}>
            <TextField
              sx={{
                '& .MuiSvgIcon-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 100px #fff inset',
                  WebkitTextFillColor: 'inherit',
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
                '& .MuiSvgIcon-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 100px #fff inset',
                  WebkitTextFillColor: 'inherit',
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
                fontSize: '12px',
                color: 'red',
                display: isVisible ? 'block' : 'none',
              }}
            >
              아이디 또는 비밀번호가 일치하지 않습니다.
            </Box>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 5, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
        {/* </Grid>
          <Grid xs={false} sx={{ zIndex: -2 }}> */}
        <Box sx={{ marginLeft: '300px', marginTop: '-515px', position: 'relative', zIndex: 1 }}>
          {/* <div style={{ position: 'relative' }}>
                <img src={imageUrl} alt="image" />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <p>{text}</p>
                </div>
              </div> */}
          <Box
            component="img"
            src={backImg}
            sx={{
              width: '500px',
              height: '550px',
            }}
          />
          <div style={{ width: '80%', position: 'absolute', top: '60%', left: '55%', transform: 'translate(-50%, -50%)' }}>
            <p style={{ marginBottom: '15px', fontSize: '1.2em', fontWeight: '700', color: 'white' }}>스마트 물류 시스템</p>
            <br></br>
            <p style={{ fontSize: '0.9em', color: 'white' }}>재고관리부터 입출고처리까지 원스탑으로 편리한 관리!</p>
          </div>
        </Box>
        {/* </Grid>
        </Grid> */}
      </Box>
      <div className={styles.container}>
        <div className={styles.card} style={{ transform: `rotateY(${rotate}deg)` }}>
          <div className={styles.cardFront}>
            <h2>Front</h2>
          </div>
          <div className={styles.cardBack}>
            <h2>Back</h2>
          </div>
        </div>
        <button onClick={handleRotate}>Rotate</button>
      </div>
      <button onClick={handleRotate2}>Rotate</button>
      <div className={styles.container}>
        <div className={styles.cube} style={{ transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)` }}>
          <div className={`${styles.face} ${styles.front}`}>
            <h2>Front</h2>
          </div>
          <div className={`${styles.face} ${styles.bottom}`}>
            <h2>Thank You</h2>
          </div>
          <div className={`${styles.face} ${styles.back}`}>
            <h2>Back</h2>
          </div>
          <div className={`${styles.face} ${styles.left}`}>
            <h2>Left</h2>
          </div>
          <div className={`${styles.face} ${styles.right}`}>
            <h2>Right</h2>
          </div>
          <div className={`${styles.face} ${styles.top}`}>
            <h2>Top</h2>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
