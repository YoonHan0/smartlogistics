import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import UserSerchBar from "./UserSerchBar";
import UserUpdate from "./UserUpdate";
import { Box, Grid } from "@mui/material";

const User = () => {
    
  // productlist
  const [users, setUsers] = useState([]);
  // productdetail
  const [Detail, setDetail] = useState([]);

  const [item, setItem] = useState({ id: "", name: "", phone: "" });

  useEffect(() => {
    userSearch(null);
  }, []);
  
  //product 검색
  const userSearch = async (searchKw) => {
    var url = `/api/user/list`;
    if (searchKw) {
      url = `/api/user/list?uk=${searchKw.ukeywd}&us=${searchKw.usize}`;
    }
    try {
      const response = await fetch(url, {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }
      console.log(json.data);
      setUsers(json.data);
    } catch (err) {
      console.log(err);
    }
  };


  // product 추가
  const itemAddHandler = async (item) => {
    //console.log(item);
    if (item != null) {
      try {
        const response = await fetch("/api/user/data", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

            Authorization:localStorage.getItem("token")

          },
          body: JSON.stringify(item),
        });

        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        if (json.result !== "success") {
          throw new Error(`${json.result} ${json.message}`);
        }
        //db에 추가작업 끝남
        //console.log(item, "추가완료");
        setUsers([json.data, ...users]);
      } catch (err) {
        console.log(err.message);
      }
    }
  };



  
  //product 수정
  const itemUpdateHandler = async (item, target) => {
    console.log("update");
    try {
      const response = await fetch(`/api/user/update?uc=${target}`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

          Authorization:localStorage.getItem("token")

        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }
      userSearch(null);
    } catch (err) {
      console.log(err.message);
    }
  };

  // product 세부사항
  const userDetail = async (id) => {
    try {
      const response = await fetch(`/api/user/detail?uc=${id}`, {
        method: "get",
        headers: {
          Accept: "application/json",

          Authorization:localStorage.getItem("token")

        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }
      // console.log(json.data);
      setDetail(json.data);
    } catch (err) {
      console.log(err);
    }
  };

  // product 삭제
  const deleteItemHandler = async (data) => {
    console.log(" ===== delete ===== ");
    console.log(data);
    try {
      const response = await fetch(`/api/user/delete`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",

          Authorization:localStorage.getItem("token")

        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }
      setUsers(
        users.filter((user) => json.data.indexOf(user.code) == -1)
      );
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Box>
      <Grid container
            spacing={2}
            style={{ marginLeft: '0px' }}
      >
        <UserSerchBar callback={userSearch} />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '100%'
          }}
        >
          <UserList
            users={users}
            userDetail={userDetail}
            itemAddHandler={itemAddHandler}
            deleteItemHandler={deleteItemHandler}
            setItem={setItem}
          />
          <UserUpdate
            userDetail={Detail}
            itemUpdateHandler={itemUpdateHandler}
            item={item}
            setItem={setItem}
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default User;