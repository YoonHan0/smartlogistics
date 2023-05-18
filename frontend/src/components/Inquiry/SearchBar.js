import { Button, FormControl, TextField, Box, Grid } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
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
import { format } from 'date-fns';

const SearchBar = ({ seDate, state, setState, searchKeyword, searchKw, setSearchKw }) => {
  const [searchChk, setSearchChk] = useState();
  const [minDate, setMindate] = useState();
  const refForm = useRef(null);

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setSearchKw((searchKw) => ({ ...searchKw, [name]: value }));
  };

  const handleAcceptStart = (date) => {
    setMindate(date);
    setSearchKw((prev) => ({ ...prev, startdt: format(date.$d, 'yyyy-MM-dd') }));
    setSearchChk(true);
  };
  const handleAcceptEnd = (date) => {
    setSearchKw((prev) => ({ ...prev, enddt: format(date.$d, 'yyyy-MM-dd') }));
  };
  const submit = (e) => {
    e.preventDefault();
    if (searchKw.startdt !== '') {

      setSearchChk(true);
    } else {
      setSearchChk(false);
    }
    if (searchChk) {
      console.log(searchKw)
      searchKeyword(searchKw, 0);
      setSearchChk();
      setSearchKw({ user_name: '', business_name: '', code: '', startdt: '', enddt: '' });
    }

    console.log(searchKw)
  };



  useEffect(() => {
    setSearchKw({ ...searchKw, startdt: seDate.sDate, enddt: seDate.eDate });
  }, [seDate]);
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
                        border: searchChk === false || null ? '1px solid red' : null,
                        width: '165px',
                      },
                      '& .css-e1omjc-MuiStack-root>.MuiTextField-root': {
                        minWidth: 0,
                        height: '35px',
                      },
                    }}
                    onAccept={handleAcceptStart}
                    value={dayjs(searchKw.startdt) || null}
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
                        border: searchChk === false || null ? '1px solid red' : null,
                        width: '165px',
                      },
                      '& .css-e1omjc-MuiStack-root>.MuiTextField-root': {
                        minWidth: 0,
                        height: '35px',
                      },
                    }}
                    minDate={minDate || null}
                    onAccept={handleAcceptEnd}
                    value={dayjs(searchKw.enddt) || null}
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