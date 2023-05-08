import { Button, FormControl, TextField, Box, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const SerchBar = ({ callback }) => {
  const [searchKw, setSearchKw] = useState({ rcode: "", bname: "", rdate: "" });

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setSearchKw((prev) => ({ ...prev, [name]: value }));
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
        onSubmit={(e) => {
          e.preventDefault();
          callback(searchKw);
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
          />
          <label sx={{ fontSize: "0.5rem" }}>거래처</label>
          <TextField
            type="text"
            name="bname"
            onChange={changeHandler}
            size="small"
            sx={{ paddingLeft: 2, paddingRight: 5 }}
            InputProps={{ sx: { height: 30, width: 150 } }}
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
                }}
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
