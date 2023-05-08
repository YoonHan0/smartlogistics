import { Box, Button, FormControl, TextField, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function UserUpdate({
  itemUpdateHandler,
  userDetail,
  item,
  setItem,
}) {
  const [target, setTarget] = useState();

  useEffect(() => {
    setTarget(userDetail.id);
    console.log(userDetail)
    setItem({
      id: userDetail.id,
      name: userDetail.name,
      phone: userDetail.phone,
    });
    return () => {};
  }, [userDetail]);

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setItem({ ...item, [name]: value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    itemUpdateHandler(item, target);
    setItem({ code: "", name: "", phone: "" }); // update form data 초기화
  };
  return (
    <Grid item xs={4}
            sx={{
                padding: 3,
                backgroundColor: "#FFF",
                borderRadius: "8px",
                boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
            }}
    >
      <span style={{
              fontSize: '18px',
              fontWeight: 800            
      }}>
        상세보기
      </span>
      <FormControl
        component="form"
        onSubmit={onSubmitHandler}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          marginTop: 3,
        }}
      >
        <Grid container>
          <Grid item
            xs={4}
            sm={4}
            md={4}
            sx={{
                backgroundColor: "#F6F7F9",
                textAlign: "center",
                paddingTop: "8px",
            }}
        >
          <Typography sx={{fontSize: '0.9rem'}}>아이디</Typography>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <TextField
            type="text"
            name="id"
            size="small"
            value={item.id || ""}
            variant="outlined"
            onChange={changeHandler}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item
                xs={4}
                sm={4}
                md={4}
                sx={{
                    backgroundColor: "#F6F7F9",
                    textAlign: "center",
                    paddingTop: "8px",
                }} 
        >
          <Typography sx={{ fontSize: '0.9rem'}}>이름</Typography>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <TextField
            type="text"
            name="name"
            value={item.name || ""}
            onChange={changeHandler}
            size="small"
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item
                xs={4}
                sm={4}
                md={4}
                sx={{
                    backgroundColor: "#F6F7F9",
                    textAlign: "center",
                    paddingTop: "8px",
                }}
        >
          <Typography sx={{fontSize: '0.9rem'}}>전화번호</Typography>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <TextField
            type="text"
            name="phone"
            value={item.phone || ""}
            onChange={changeHandler}
            size="small"
            variant="outlined" 
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button type="submit" variant="outlined" sx={{ marginTop: 2, width:'100%' }}>
            등록
          </Button>
        </Grid>
        </Grid>
      </FormControl>
    </Grid>
  );
}