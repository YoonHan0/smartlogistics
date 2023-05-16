import { Button, FormControl, TextField, Box, Grid } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from 'date-fns';
import dayjs from 'dayjs';

const SerchBar = ({ callback, seDate }) => {


  const [searchKw, setSearchKw] = useState({ rcode: '', bname: '', startdt: '', enddt: '' });
  const [searchChk, setSearchChk] = useState();
  const [minDate, setMindate] = useState();

  const refForm = useRef(null);

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setSearchKw((prev) => ({ ...prev, [name]: value }));
  };

  const handleAcceptStart = (date) => {
    setMindate(date);
    setSearchKw({ ...searchKw, startdt: format(date.$d, 'yyyy-MM-dd') });
    setSearchChk(true);
  };
  const handleAcceptEnd = (date) => {
    console.log("date====", date);
    setSearchKw({ ...searchKw, enddt: format(date.$d, 'yyyy-MM-dd') });
  };
  const submit = (e) => {
    e.preventDefault();
    if (searchKw.startdt !== '') {
      setSearchChk(true);
    } else {
      setSearchChk(false);
    }
    if (searchChk) {
      callback(searchKw);
      setSearchChk();
      setSearchKw({ rcode: '', bname: '', startdt: '', enddt: '' });
    }
  };

  useEffect(() => {
    //callback(searchKw);
    // return () => {};
    console.log("searchKw 변경!");
    console.log(searchKw);
  }, [searchKw]);

  return (
    <Grid
      item
      xs={12}
      md={12}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        marginBottom: 3,
        backgroundColor: "#FFF",
        borderRadius: "8px",
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
        height: "100px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "30px",
          marginTop: "6px",
          marginBottom: "10px",
        }}
      >
        <span
          style={{
            fontSize: "23px",
            fontWeight: 800,
            marginRight: "15px",
          }}
        >
          출고
        </span>

        <span
          style={{
            backgroundColor: "#EBF2FF",
            padding: "3px 8px",
          }}
        >
          <FontAwesomeIcon icon={faVolumeHigh} />
          <span
            style={{
              color: "gray",
              fontSize: "9px",
              marginLeft: "8px",
            }}
          >
            출고를 조회할 수 있습니다.
          </span>
        </span>
      </Box>

      <FormControl
        component="form"
        ref={refForm}
        onSubmit={(e) => {
          submit(e);
        }}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <label style={{ fontSize: "0.9rem"}}>출고코드</label>
          <TextField
            type="text"
            name="rcode"
            onChange={changeHandler}
            size="small"
            sx={{ paddingLeft: 2, paddingRight: 5 }}
            InputProps={{ sx: { height: 30, width: 150 } }}
            value={searchKw.rcode}
          />
          <label style={{ fontSize: "0.9rem"}}>거래처</label>
          <TextField
            type="text"
            name="bname"
            onChange={changeHandler}
            size="small"
            sx={{ paddingLeft: 2, paddingRight: 5 }}
            InputProps={{ sx: { height: 30, width: 150 } }}
            value={searchKw.bname}
          />
          <label style={{ fontSize: "0.9rem"}}>기간</label>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            sx={{ height: "60px" }}
          >
            <DemoContainer
              components={["DatePicker"]}
              sx={{
                p: 0,
                "& .css-1xhypcz-MuiStack-root": {
                  padding: 0,
                },
              }}
            >
              <DatePicker
                format="YYYY-MM-DD"
                slotProps={{
                  textField: { 
                    size: "small",
                    style: { 'minWidth': 'unset' } 
                  },
                }}
                sx={{
                  minWidth: 0,
                  paddingLeft: 2,
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
                value={searchKw.startdt || dayjs(seDate.sDate) || null}
                onAccept={handleAcceptStart}
              ></DatePicker>
              <span>~</span>
              <DatePicker
                readOnly={searchKw.startdt === '' || searchKw.startdt === null}
                format="YYYY-MM-DD"
                slotProps={{
                  textField: { size: "small" },
                }}
                sx={{
                  minWidth: 0,
                  paddingRight: 5,
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
                value={searchKw.enddt || dayjs(seDate.eDate) || null}
                onAccept={handleAcceptEnd}
              ></DatePicker>
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Button type="submit" variant="outlined" sx={{ marginRight: 6 }}>
          <SearchIcon />
        </Button>
      </FormControl>
    </Grid>
  );
};

export default SerchBar;
