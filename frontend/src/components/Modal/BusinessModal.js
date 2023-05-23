import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { customFetch } from '../custom/customFetch';

export default function BusinessModal({ open, onClose, handleButtonClick }) {
  const [business, setBusiness] = useState([]);
  const searchKw = useRef({ code: '', phone: '' });
  const [isFetching, setIsFetching] = useState(false);
  const startIndex = useRef(0);
  const isNotDataMore = useRef(false);
  const form = useRef();
  const loading = useRef(true);
  const [searchTextFiled, setSearchTextFiled] = useState({ keywd: '', phone: '' });
  useEffect(() => {
    const tablePro = document.getElementById('table');
    tablePro.addEventListener('scroll', handleWindowScroll);
    if (open === true) {
      searchKWDfetch();
    }

    return () => {
      tablePro.removeEventListener('scroll', handleWindowScroll);
    };
  }, [open]);

  const onCloseAndClear = () => {
    // setBusiness([]);
    setSearchTextFiled({ keywd: '', phone: '' });
    startIndex.current = 0;
    searchKw.current = { keywd: '', phone: '' };
    onClose();
  };

  const handleWindowScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;

    if (clientHeight + scrollTop + 10 > scrollHeight) {
      searchKWDfetch();
    }
  };

  const onEnterHandler = () => {
    if (window.event.keyCode == 13) {
      onClickHandler();
    }
  };

  const onClickHandler = () => {
    startIndex.current = 0;
    searchKw.current = searchTextFiled;
    isNotDataMore.current = false;
    loading.current = true;
    setSearchTextFiled({ keywd: '', phone: '' });
    // form.current.reset();

    // setBusiness([]);
    searchKWDfetch();
  };

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setSearchTextFiled((prev) => ({ ...prev, [name]: value }));
  };

  const searchKWDfetch = async () => {
    if (isFetching) {
      return;
    }
    if (isNotDataMore.current) {
      return;
    }
    const limit = 10;
    setIsFetching(true);
    console.log('test');
    await customFetch(`/api/business/search?page=${startIndex.current}&offset=${limit}`, {
      method: 'post',
      body: JSON.stringify(searchKw.current),
    }).then((json) => {
      if (json.data.length === limit) {
        startIndex.current += limit;
      } else {
        isNotDataMore.current = true;
      }
      if (json.data !== null) {
        loading.current = false;
      }
      setBusiness(json.data);
      setIsFetching(false);
    });
  };

  return (
    <Box>
      <Modal open={open} onClose={onCloseAndClear}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 900,
            height: 400,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 5,
            p: 3,
          }}
        >
          <Box
            variant="h6"
            sx={{
              fontSize: '28px',
              textAlign: 'center',
              mb: '20px',
            }}
          >
            거래처
          </Box>
          <Box>
            <Box
              sx={{
                mt: 1,
                display: 'flex',
                float: 'right',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <label style={{ fontSize: '0.9rem' }}>검색어</label>
              <TextField
                size="small"
                sx={{
                  paddingLeft: '15px',
                  paddingRight: '40px',
                }}
                onChange={onChangeHandler}
                onKeyUp={onEnterHandler}
                value={setSearchTextFiled.code}
                name="code"
                InputProps={{ sx: { height: 30, width: 150 } }}
              ></TextField>
              <label style={{ fontSize: '0.9rem' }}>전화번호</label>
              <TextField
                size="small"
                sx={{
                  paddingLeft: '15px',
                  paddingRight: '40px',
                }}
                onChange={onChangeHandler}
                onKeyUp={onEnterHandler}
                value={setSearchTextFiled.phone}
                name="phone"
                InputProps={{ sx: { height: 30, width: 150 } }}
              ></TextField>
              <Button type="submit" variant="outlined" sx={{ marginRight: 'auto' }} onClick={onClickHandler}>
                <SearchIcon />
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '80px',
              borderBottom: '0.5px solid #e9e9e9',
            }}
          />
          <Box
            sx={{
              width: '800px',
              height: '221px',
              overflow: 'auto',
              inlineSize: 'auto',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              border: '1px solid #D1D1D1',
            }}
            onScroll={handleWindowScroll}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>
                    순번
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>
                    거래처코드
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>
                    거래처명
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>
                    전화번호
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>
                    선택
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading.current ? (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  business.map((data, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        ':hover': {
                          background: '#EFF8FF',
                          fontWeight: 600,
                        },
                      }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{data.code}</TableCell>
                      <TableCell align="center">{data.name}</TableCell>
                      <TableCell align="center">{data.phone}</TableCell>
                      <TableCell align="center">
                        <Button
                          sx={{ width: '100%', p: 0 }}
                          onClick={() => {
                            handleButtonClick('business', {
                              businessCode: data.code,
                              businessName: data.name,
                            });
                          }}
                        >
                          선택
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
