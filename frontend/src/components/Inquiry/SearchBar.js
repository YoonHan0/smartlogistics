import { Button, FormControl, TextField, Box, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const SerchBar = ({ state, setState, callback }) => {
  const [searchKw, setSearchKw] = useState({ rdate: "", code: "" , user_name: "", business_name: "" });
  const changeHandler = (e) => {
    const { value, name } = e.target;
    setSearchKw((searchKw) => ({ ...searchKw, [name]: value }));
    console.log(searchKw);
  };

  useEffect(() => {
    //callback(searchKw);
    return () => { };
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
        height: state ? "140px" : "100px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "30px",
          marginTop: "15px",
        }}
      >
        <span
          style={{
            fontSize: "23px",
            fontWeight: 800,
            marginRight: "15px",
          }}
        >
          현황 조회
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
            현재 입고와 출고 현황을 조회 할 수 있습니다.
          </span>
        </span>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: "5px",
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
          <strong>조회</strong>
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
          <strong>그래프</strong>
        </Button>
      </Box>
      {
        state ?
          <FormControl
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              callback(searchKw);
            }}
            sx={{
              m: 1,
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
                    onChange={(value) => setSearchKw((searchKw) => ({ ...searchKw, 'rdate': value }))}
                    name="rdate"
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
                    }}
                  ></DatePicker>
                </DemoContainer>
              </LocalizationProvider>
              <label sx={{ fontSize: "0.5rem" }}>담당자</label>
              <TextField
                type="text"
                name="user_name"
                onChange={changeHandler}
                size="small"
                sx={{ paddingLeft: 2, paddingRight: 5 }}
                InputProps={{ sx: { height: 30, width: 150 } }}
              />
              <label sx={{ fontSize: "0.5rem" }}>거래처</label>
              <TextField
                type="text"
                name="business"
                onChange={changeHandler}
                size="small"
                sx={{ paddingLeft: 2, paddingRight: 5 }}
                InputProps={{ sx: { height: 30, width: 150 } }}
              />
              <label sx={{ fontSize: "0.5rem" }}>번호</label>
              <TextField
                type="text"
                name="code"
                onChange={changeHandler}
                size="small"
                sx={{ paddingLeft: 2, paddingRight: 5 }}
                InputProps={{ sx: { height: 30, width: 150 } }}
              />

            </Box>
            <Button type="submit" variant="outlined" sx={{ marginRight: 6 }} onClick={callback}>
              <SearchIcon />
            </Button>
          </FormControl> 
          :
          <></>
      }
    </Grid>
  );
};

export default SerchBar;
