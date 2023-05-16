import { Button, FormControl, TextField, Box, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import dayjs from 'dayjs';

const SearchBar = ({ state, setState, searchKeyword, sdate, setSdate, edate, setEdate, searchKw, setSearchKw }) => {
  const changeHandler = (e) => {
    const { value, name } = e.target;
    setSearchKw((searchKw) => ({ ...searchKw, [name]: value }));
  };

  const changeDayjsToString = (date) => {
    const year = date.year();
    const _date = String(date.month()+1).padStart(2, '0');
    const day = String(date.date()).padStart(2, '0');

    return `${year}-${_date}-${day}`;
  } 
  
  const handleChangeDatePicker1 = (value) => {
    const d = changeDayjsToString(value);
      setSearchKw((searchKw) => ({ ...searchKw, 'sdate' : d }))
      setSdate(d);
    };

  const handleChangeDatePicker2 = (value) => {
    const d = changeDayjsToString(value);
    setSearchKw((searchKw) => ({ ...searchKw, 'edate' : d }))
    setEdate(d);

  };

  return (
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
        height: state ? '120px' : '90px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginLeft: '30px',
          marginTop: '22px',
        }}
      >
        <Box>
          <span
            style={{
              fontSize: '23px',
              fontWeight: 800,
              marginRight: '15px',
            }}
          >
            현황 조회
          </span>

          <span
            style={{
              backgroundColor: '#EBF2FF',
              padding: '3px 8px',
            }}
          >
            <FontAwesomeIcon icon={faVolumeHigh} />
            <span
              style={{
                color: 'gray',
                fontSize: '9px',
                marginLeft: '8px',
              }}
            >
              현재 입고와 출고 현황을 조회 할 수 있습니다.
            </span>
          </span>
        </Box>
        <Box
          sx={{
            display: 'flex',
            height: 20,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: 6
        }}>
        <Button
          sx={{
            width: '100px',
            bgcolor: state ? '#0671F7' : '#E7E6E6',
            color: state ? '#fff' : '#000',
            borderRadius: '20px 0 0 20px',
            ':hover': {
              bgcolor: state ? '#0671F7' : '#E7E6E6',
            }
          }}
          onClick={e => setState(true)}
        >
          <FormatListBulletedIcon sx={{fontSize: 20}}/>
        </Button>
        <Button
          sx={{
            width: '100px',
          bgcolor: state ? '#E7E6E6' : '#0671F7',
            color: state ? '#000' : '#fff',
            borderRadius: '0 20px 20px 0',
            ':hover': {
              bgcolor: state ? '#E7E6E6' : '#0671F7',
            }
          }}
          onClick={e => setState(false)}
        >
          <LeaderboardIcon sx={{fontSize: 20}}/>
        </Button>
      </Box>
      </Box>
      
      {
        state ?
          <FormControl
            component='form'
            onSubmit={(e) => {
              e.preventDefault();
              searchKeyword(searchKw);
            }}
            sx={{
              m: 1,
              marginTop: 3,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <label sx={{ fontSize: '0.5rem' }}>날짜</label>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                sx={{ height: '100px'}}
              >
                <DemoContainer
                  components={['DatePicker']}
                  sx={{
                    p: 0,
                    '& .css-1xhypcz-MuiStack-root': {
                      padding: 0,
                    },
                  }}
                >

                  <DatePicker
                    format='YYYY-MM-DD'
                    value={dayjs(sdate)}
                    onChange={handleChangeDatePicker1}
                    name='sdate'
                    slotProps={{
                      textField: { size: 'small' },
                    }}
                    sx={{
                      paddingLeft: 2,
                      paddingRight: 5,
                      overflow: 'hidden',
                      '& .css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input': {
                        padding: 0,
                        height: 30,
                        width: 150
                      },
                    }}
                    ></DatePicker>
                  <Box
                    sx={{
                      p:0,
                      m:0
                    }}>~</Box>
                  <DatePicker
                    readOnly={searchKw.sdate === '' || searchKw.sdate === null}
                    format='YYYY-MM-DD'
                    value={dayjs(edate)}
                    onChange={handleChangeDatePicker2}
                    name='edate'
                    slotProps={{
                      textField: { size: 'small' },
                    }}
                    sx={{
                      paddingLeft: 2,
                      paddingRight: 5,
                      overflow: 'hidden',
                      '& .css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input': {
                        padding: 0,
                        height: 30,
                        width: 150
                      },
                    }}
                  ></DatePicker>
                </DemoContainer>
              </LocalizationProvider>
              <label sx={{ fontSize: '0.5rem' }}>담당자</label>
              <TextField
                type='text'
                name='user_name'
                onChange={changeHandler}
                size='small'
                sx={{ paddingLeft: 2, paddingRight: 5 }}
                InputProps={{ sx: { height: 30, width: 150 } }}
              />
              <label sx={{ fontSize: '0.5rem' }}>거래처</label>
              <TextField
                type='text'
                name='business_name'
                onChange={changeHandler}
                size='small'
                sx={{ paddingLeft: 2, paddingRight: 5 }}
                InputProps={{ sx: { height: 30, width: 150 } }}
              />
              <label sx={{ fontSize: '0.5rem' }}>번호</label>
              <TextField
                type='text'
                name='code'
                onChange={changeHandler}
                size='small'
                sx={{ paddingLeft: 2, paddingRight: 5 }}
                InputProps={{ sx: { height: 30, width: 150 } }}
              />

            </Box>
            <Button type='submit' variant='outlined' sx={{ marginRight: 6 }} onClick={searchKeyword}>
              <SearchIcon />
            </Button>
          </FormControl>
          :
          <></>
      }
    </Grid>
  );
};

export default SearchBar;