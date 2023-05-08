import { Button, FormControl, TextField, Box, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
const Modal4Search = ({ callback }) => {
  const [searchKw, setSearchKw] = useState({ pkeywd: "", psize: "" });
  const changeHandler = (e) => {
    const { value, name } = e.target;
    setSearchKw((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    //callback(searchKw);
    return () => {};
  }, [searchKw]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFF",
        borderRadius: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          marginTop: "20px",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#EBF2FF",
            padding: "1px 8px",
            marginLeft: 0,
          }}
        >
          <FontAwesomeIcon icon={faVolumeHigh} />
          <span
            style={{
              color: "gray",
              fontSize: "9px",
            }}
          >
            출고를 원하는 입고번호와 품목을 체크해주세요.
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
          display: "flexend",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 2,
          marginBottom: "10px",
        }}
      >
        <Box
          sx={{
            mt: 1,
            display: "flex",
            float: "right",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <label sx={{ fontSize: "0.5rem",  }}>검색어</label>
          <TextField
            type="text"
            name="pkeywd"
            onChange={changeHandler}
            size="small"
            sx={{
              paddingLeft: "15px",
              paddingRight: "40px",
            }}
          />
          <label sx={{ fontSize: "0.5rem" }}>규격</label>
          <TextField
            type="text"
            name="psize"
            onChange={changeHandler}
            size="small"
            sx={{
              paddingLeft: "15px",
              paddingRight: "30px",
            }}
          />
          <label sx={{ fontSize: "0.5rem" }}>단위</label>
          <TextField
            type="text"
            name="punit"
            onChange={changeHandler}
            size="small"
            sx={{
              paddingLeft: "15px",
              paddingRight: "30px",
            }}
          />
        </Box>
        <Button type="submit" variant="outlined" >
          <SearchIcon />
        </Button>
      </FormControl>
    </Box>
  );
};
export default Modal4Search;