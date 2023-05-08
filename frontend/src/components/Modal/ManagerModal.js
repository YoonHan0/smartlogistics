import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, FormControl, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ManagerModal = ({ open, onClose, handleButtonClick }) => {
  useEffect(() => {
    searchKWDfetch();
    return () => {
      setPerson([]);
      setSearchKWD({ keywd: '', phone: '' });
      setModal({
        isLoading: false,
        hasMore: true,
        isChange: false,
      });
      page.current = 0;
      console.log('close modal');
    };
  }, [open]);
  const page = useRef(0);

  const [person, setPerson] = useState([]);
  const [searchKWD, setSearchKWD] = useState({ keywd: '', phone: '' });
  const [modal, setModal] = useState({
    isLoading: false,
    hasMore: true,
    isChange: false,
  });

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setSearchKWD((prev) => ({ ...prev, [name]: value }));
  };

  const searchKWDfetch = async () => {
    //console.log(searchKWD);
    var url = `/api/user/list?uk=${searchKWD.keywd}&us=${searchKWD.phone}`;
    try {
      const response = await fetch(url, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== 'success') {
        throw new Error(`${json.result} ${json.message}`);
      }
      // console.log(json.data);
      setPerson(json.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Modal open={open} onClose={onClose}>
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
            담당자
          </Box>
          <Box>
            <FormControl
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                searchKWDfetch();
              }}
              sx={{
                mt: 1,
                display: 'flex',
                float: 'right',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <label sx={{ fontSize: '0.5rem' }}>이름</label>
              <TextField
                size="small"
                sx={{
                  paddingLeft: '15px',
                  paddingRight: '40px',
                }}
                onChange={onChangeHandler}
                name="keywd"
                InputProps={{ sx: { height: 30, width: 150 } }}
              ></TextField>
              <label sx={{ fontSize: '0.5rem' }}>전화번호</label>
              <TextField
                size="small"
                sx={{
                  paddingLeft: '15px',
                  paddingRight: '30px',
                }}
                onChange={onChangeHandler}
                name="phone"
                InputProps={{ sx: { height: 30, width: 150 } }}
              ></TextField>
              <Button type="submit" variant="outlined" sx={{ marginRight: 'auto' }}>
                <SearchIcon />
              </Button>
            </FormControl>
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
              height: '190px',
              overflow: 'auto',
              inlineSize: 'auto',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: '#F6F7F9' }} align="center">
                    순번
                  </TableCell>
                  <TableCell sx={{ backgroundColor: '#F6F7F9' }} align="center">
                    아이디
                  </TableCell>
                  <TableCell sx={{ backgroundColor: '#F6F7F9' }} align="center">
                    이름
                  </TableCell>
                  <TableCell sx={{ backgroundColor: '#F6F7F9' }} align="center">
                    전화번호
                  </TableCell>
                  <TableCell sx={{ width: '10%', backgroundColor: '#F6F7F9' }} align="center">
                    선택
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {person.map((data, index) => (
                  <TableRow key={index} sx={{ height: 2, p: 0 }}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{data.id}</TableCell>
                    <TableCell align="center">{data.name}</TableCell>
                    <TableCell align="center">{data.phone}</TableCell>
                    <TableCell align="center">
                      <Button
                        sx={{ width: '100%', p: 0 }}
                        onClick={() => {
                          handleButtonClick('manager', {
                            userId: data.id,
                            userName: data.name,
                          });
                        }}
                      >
                        선택
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ManagerModal;
