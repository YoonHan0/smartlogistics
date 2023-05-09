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

const SerchBar = ({ callback }) => {
  const [searchKw, setSearchKw] = useState({ rcode: "", bname: "", rdate: "" });
  const [searchChk, setSearchChk] = useState();
  const refForm = useRef(null);

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setSearchKw((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccept = (date) => {
    setSearchKw({ ...searchKw, rdate: format(date.$d, 'yyyy-MM-dd') });
    setSearchChk(true);
  };

  useEffect(() => {
    //callback(searchKw);
    return () => {};
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
          e.preventDefault();
          if (searchKw.rdate !== '') {
            setSearchChk(true);
          } else {
            setSearchChk(false);
            // alert("날짜는 필수값입니다!");
          }
          if (searchChk) {
            callback(searchKw);
            setSearchChk();
            refForm.current.reset();
            setSearchKw({ rcode: '', bname: '', rdate: '' });
          }
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
          <label sx={{ fontSize: "0.5rem" }}>출고코드</label>
          <TextField
            type="text"
            name="rcode"
            onChange={changeHandler}
            size="small"
            sx={{ paddingLeft: 2, paddingRight: 5 }}
            InputProps={{ sx: { height: 30, width: 150 } }}
            value={searchKw.rcode}
          />
          <label sx={{ fontSize: "0.5rem" }}>거래처</label>
          <TextField
            type="text"
            name="bname"
            onChange={changeHandler}
            size="small"
            sx={{ paddingLeft: 2, paddingRight: 5 }}
            InputProps={{ sx: { height: 30, width: 150 } }}
            value={searchKw.bname}
          />
          <label sx={{ fontSize: "0.5rem" }}>날짜</label>
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
                  textField: { size: "small" },
                }}
                sx={{
                  paddingLeft: 2,
                  paddingRight: 5,

                  "& .css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input": {
                    padding: 0,
                    height: 30,
                    width: 150,
                  },
                  '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                    border: searchChk === false || null ? '1px solid red' : null,
                  },
                }}
                value={searchKw.rdate || null}
                onAccept={handleAccept}
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
