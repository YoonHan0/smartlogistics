import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, FormControl, Grid, TextField, Typography } from '@mui/material';
import { customFetch } from '../custom/customFetch';
import MyData from './MyData';
import MyReceive from './MyReceive';
import MyRelease from './MyRelease';

const MyPage = ({ info, setUserInfo }) => {
  return (
    <Box>
      <Grid container sx={{ marginLeft: '0px', marginTop: '-16px' }}>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              marginBottom: 3,
              backgroundColor: '#FFF',
              borderRadius: '8px',
              boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
              height: '100px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '30px',
                marginTop: '6px',
                padding: '16px 0 0 16px',
              }}
            >
              <span
                style={{
                  fontSize: '23px',
                  fontWeight: 800,
                  marginRight: '15px',
                }}
              >
                마이페이지
              </span>

              <span
                style={{
                  backgroundColor: '#EBF2FF',
                  padding: '3px 8px',
                }}
              >
                <span
                  style={{
                    color: 'gray',
                    fontSize: '9px',
                    marginLeft: '8px',
                  }}
                >
                  사용자 정보를 조회 및 수정할 수 있습니다.
                </span>
              </span>
            </Box>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 3,
            backgroundColor: '#FFF',
            borderRadius: '8px',
            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
            height: '730px',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              fontWeight: 800,
              marginLeft: '380px',
              marginTop: '30px',
            }}
          >
            나의정보
          </span>
          <MyData info={info} setUserInfo={setUserInfo} />
          <span
            style={{
              fontSize: '18px',
              fontWeight: 800,
              marginLeft: '380px',
              marginTop: '30px',
            }}
          >
            나의활동
          </span>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <MyReceive info={info} />
            <MyRelease info={info} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyPage;
