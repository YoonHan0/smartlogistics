import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import UserSerchBar from "./UserSerchBar";
import UserUpdate from "./UserUpdate";
import { Box, Grid } from "@mui/material";
import { customFetch } from "../custom/customFetch";

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
    await customFetch(url, { method: "get" }).then((json) =>
      setUsers(json.data)
    );
  };

  // product 추가
  const itemAddHandler = async (item) => {
    //console.log(item);
    if (item != null) {
      await customFetch("/api/user/data", {
        method: "post",
        body: JSON.stringify(item),
      }).then((json) => setUsers([json.data, ...users]));
    }
  };

  //product 수정
  const itemUpdateHandler = async (item, target) => {
    console.log("update");
    await customFetch(`/api/user/update?uc=${target}`, {
      method: "post",
      body: JSON.stringify(item),
    }).then(() => userSearch(null));
  };

  // product 세부사항
  const userDetail = async (id) => {
    await customFetch(`/api/user/detail?uc=${id}`, { method: "get" }).then(
      (json) => setDetail(json.data)
    );
  };

  // product 삭제
  const deleteItemHandler = async (data) => {
    console.log(" ===== delete ===== ");
    console.log(data);
    await customFetch(`/api/user/delete`, {
      method: "post",
      body: JSON.stringify(data),
    }).then((json) =>
      setUsers(users.filter((user) => json.data.indexOf(user.code) == -1))
    );
  };

  return (
    <Box>
      <Grid container spacing={2} style={{ marginLeft: "0px" }}>
        <UserSerchBar callback={userSearch} />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
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
