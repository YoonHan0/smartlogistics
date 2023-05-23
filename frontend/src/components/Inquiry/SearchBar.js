import { Button, FormControl, TextField, Box, Grid } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import dayjs from 'dayjs';
import { format } from 'date-fns';

const SearchBar = ({ seDate, state, setState, searchKeyword, searchKw, setSearchKw }) => {
  const [minDate, setMindate] = useState();
  const refForm = useRef(null);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setSearchKw((prev) => ({ ...prev, [name]: value }));
  };

  const handleAcceptStart = (date) => {
    setSearchKw({ ...searchKw, startdt: date });
  };

  const handleAcceptEnd = (date) => {
    setSearchKw({ ...searchKw, enddt: date });
  };

  const submit = (e) => {
    e.preventDefault();

    console.log(searchKw)
    searchKeyword(searchKw, 'search');
    setSearchKw({ ...searchKw, user_name: '', business_name: '', code: '' });

    console.log(searchKw)
  };

  useEffect(() => {
    return () => {};
  }, [seDate]);
  return (
    <Grid
      item
      xs={12}
      md={12}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: -2,
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
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p:'16px 0 0 16px',
            marginLeft: '30px',
            marginTop: '6px',
            marginBottom: '10px',
          }}
        >
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
              padding: '2px 5px 4.5px 0',
            }}
          >
            <span
              style={{
                color: 'gray',
                fontSize: '9px',
                marginLeft: '8px',
              }}
            >
              현황 조회를 조회할 수 있습니다.
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
            <FormatListBulletedIcon sx={{ fontSize: 20 }} />
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
            <LeaderboardIcon sx={{ fontSize: 20 }} />
          </Button>
        </Box>
      </Box>

      {
        state ?
          <FormControl
            component="form"
            ref={refForm}
            onSubmit={(e) => {
              submit(e);
            }}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginBottom: '5px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <label sx={{ fontSize: '0.5rem' }}>기간</label>
              <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ height: '60px' }}>
                <DemoContainer
                  components={['DatePicker']}
                  sx={{
                    p: 0,
                    minWidth: 0,
                    '& .css-1xhypcz-MuiStack-root': {
                      padding: 0,
                    },
                  }}
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    slotProps={{
                      textField: { size: 'small', style: { minWidth: 'unset' } },
                    }}
                    sx={{
                      minWidth: 0,
                      paddingLeft: 2,
                      overflow: 'hidden',
                      '& .css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input': {
                        padding: 0,
                        height: 30,
                        width: 105,
                        marginLeft: '10px',
                      },
                      '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                        width: '165px',
                      },
                      '& .css-e1omjc-MuiStack-root>.MuiTextField-root': {
                        minWidth: 0,
                        height: '35px',
                      },
                    }}
                    onAccept={handleAcceptStart}
                    value={searchKw.startdt === '' ? dayjs().subtract(6, 'day') : dayjs(searchKw.startdt)}
                  ></DatePicker>
                  <span>~</span>
                  <DatePicker
                    readOnly={searchKw.sDate === '' || searchKw.sDate === null}
                    style={{
                      '& .css-3tvb69-MuiStack-root>.MuiTextField-root': {
                        minWidth: 0,
                        backgroundColor: '#333',
                      },
                    }}
                    format="YYYY-MM-DD"
                    slotProps={{
                      textField: { size: 'small' },
                    }}
                    sx={{
                      minWidth: 0,
                      paddingRight: 5,
                      overflow: 'hidden',
                      '& .css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input': {
                        padding: 0,
                        height: 30,
                        width: 105,
                        marginLeft: '10px',
                      },
                      '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                        width: '165px',
                      },
                      '& .css-e1omjc-MuiStack-root>.MuiTextField-root': {
                        minWidth: 0,
                        height: '35px',
                      },
                    }}
                    minDate={searchKw.startdt || dayjs().subtract(6, 'day')}                    onAccept={handleAcceptEnd}
                    value={searchKw.enddt === '' ? dayjs().add(6, 'day') : dayjs(searchKw.enddt)}
                  ></DatePicker>
                </DemoContainer>
              </LocalizationProvider>
              <label sx={{ fontSize: '0.5rem' }}>담당자</label>
              <TextField
                type='text'
                name='user_name'
                onChange={onChangeHandler}
                size='small'
                sx={{ paddingLeft: 2, paddingRight: 5 }}
                InputProps={{ sx: { height: 30, width: 150 } }}
              />
              <label sx={{ fontSize: '0.5rem' }}>거래처</label>
              <TextField
                type='text'
                name='business_name'
                onChange={onChangeHandler}
                size='small'
                sx={{ paddingLeft: 2, paddingRight: 5 }}
                InputProps={{ sx: { height: 30, width: 150 } }}
              />
              <label sx={{ fontSize: '0.5rem' }}>번호</label>
              <TextField
                type='text'
                name='code'
                onChange={onChangeHandler}
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