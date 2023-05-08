import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { border } from "@mui/system";
import React, { useEffect, useState } from "react";

export default function ProductUpdate({
  itemUpdateHandler,
  productDetail,
  item,
  setItem,
}) {
  const [target, setTarget] = useState();

  useEffect(() => {
    setTarget(productDetail.code);

    setItem({
      code: productDetail.code,
      name: productDetail.name,
      size: productDetail.size,
      unit: productDetail.unit,
    });
    return () => {};
  }, [productDetail]);

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setItem({ ...item, [name]: value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    itemUpdateHandler(item, target);
  };
  return (
    <Grid item xs={4}
      // boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
      sx={{
        padding: 3,
        backgroundColor: "#FFF",
        borderRadius: "8px",
        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
        <span
          style={{
            fontSize: "18px",
            fontWeight: 800,
          }}
        >
          상세보기
        </span>
        <FormControl
          component="form"
          onSubmit={onSubmitHandler}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: '100%',
            marginTop: 3,
          }}
        >
          <Grid container>
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              sx={{
                backgroundColor: "#F6F7F9",
                textAlign: "center",
                paddingTop: "8px",
              }}
            >
              <Typography sx={{ fontSize: "0.9rem" }}>품번</Typography>
            </Grid>
            <Grid item xs={8} sm={8} md={8}>
              <TextField
                type="text"
                name="code"
                size="small"
                value={item.code || ""}
                onChange={changeHandler}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              sx={{
                backgroundColor: "#F6F7F9",
                textAlign: "center",
                paddingTop: "8px",
              }}
            >
              <Typography sx={{ fontSize: "0.9rem" }}>품명</Typography>
            </Grid>
            <Grid item xs={8} sm={8} md={8}>
              <TextField
                type="text"
                name="name"
                value={item.name || ""}
                onChange={changeHandler}
                size="small"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              sx={{
                backgroundColor: "#F6F7F9",
                textAlign: "center",
                paddingTop: "8px",
              }}
            >
              <Typography sx={{ fontSize: "0.9rem" }}>규격</Typography>
            </Grid>
            <Grid item xs={8} sm={8} md={8}>
              <TextField
                type="text"
                name="size"
                value={item.size || ""}
                onChange={changeHandler}
                size="small"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              sx={{
                backgroundColor: "#F6F7F9",
                textAlign: "center",
                paddingTop: "8px",
              }}
            >
              <Typography sx={{ fontSize: "0.9rem" }}>단위</Typography>
            </Grid>
            <Grid item xs={8} sm={8} md={8}>
              <TextField
                type="text"
                name="unit"
                value={item.unit || ""}
                onChange={changeHandler}
                size="small"
                sx={{ width: "100%", borderColor: "#FFF" }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button
                type="submit"
                variant="outlined"
                sx={{ marginTop: 2, width: "100%" }}
              >
                수정
              </Button>
            </Grid>
          </Grid>
        </FormControl>
    </Grid>
  );
}