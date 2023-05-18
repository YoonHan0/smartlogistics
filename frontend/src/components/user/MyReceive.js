import React, { useEffect, useState } from 'react';
import { customFetch } from '../custom/customFetch';
import checkImg from '../../assets/img/checkmark.png';
import jwt_decode from 'jwt-decode';
import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  NativeSelect,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

const MyReceive = ({ info }) => {
  // ReceiveMaster
  const [receiveMaster, setreceiveMaster] = useState([]);
  useEffect(() => {
    receiveMasterSearch();
    //console.log(info);
  }, []);

  // ReceiveMaster검색
  const receiveMasterSearch = async () => {
    var url = `/api/receive/mylist?u=${localStorage.getItem('name')}`;

    await customFetch(url, { method: 'get' }).then((json) => {
      setreceiveMaster(json.data);
    });
  };
  return (
    <Grid container spacing={2} style={{ marginLeft: '350px', marginTop: '30px', width: '50%' }}>
      <Box sx={{ display: 'flex', paddingLeft: 2.5 }}>
        <Box
          component="img"
          src={checkImg}
          sx={{
            width: 20,
            height: 20,
            marginTop: '5px',
          }}
        />
        <span
          style={{
            position: 'relative',
            fontSize: '16px',
            fontWeight: 800,
            marginRight: '15px',
            marginTop: '5px',
          }}
        >
          입고리스트
        </span>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            width: '96%',
            paddingLeft: 2.5,
            paddingTop: 0,
            boxShadow: 'none',
            height: 200,
            // marginLeft: "40px",
          }}
          // onScroll={handleScroll}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow sx={{ height: 3 }}>
                <TableCell sx={{ width: '18%', backgroundColor: '#F6F7F9' }}>입고번호</TableCell>
                <TableCell sx={{ backgroundColor: '#F6F7F9' }}>입고일</TableCell>
                <TableCell sx={{ backgroundColor: '#F6F7F9' }}>거래처</TableCell>
                <TableCell sx={{ width: '18%', backgroundColor: '#F6F7F9' }}>진행상태</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receiveMaster.length > 0 ? (
                receiveMaster.map((master, index) => {
                  return (
                    <TableRow key={index} id="searchRow">
                      <TableCell id="code">{master.code}</TableCell>
                      <TableCell>{master.date}</TableCell>
                      <TableCell>{master.businessName}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            width: '70px',
                            height: '22px',
                            backgroundColor:
                              master.state === '대기' ? '#FFE7B3' : master.state === '완료' ? '#B4E9B8' : '#B3BFF7',
                            borderRadius: '25px',
                            textAlign: 'center',
                          }}
                        >
                          <span style={{ fontWeight: 450, margin: '3px' }}>{master.state}</span>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: 'center' }}>
                    등록된 입고리스트가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
};

export default MyReceive;
