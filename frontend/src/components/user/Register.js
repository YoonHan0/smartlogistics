import { Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import sha256 from "sha256";
import { customFetch } from "../custom/customFetch";
// user 등록
const Register = () => {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [checkPassword, setCheckPassword] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState("");
  const refForm = useRef(null);

  // const [file, setFile] = useState('');
  const autoHyphen = (target) => {
    return target
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
  };

  const handlePhone = (e) => {
    if (e.target.value.length > 13) {
      return;
    }

    setPhone(autoHyphen(e.target.value));
  };

  //  const handleFile = e => {
  //   setFile(e.target.files[0]);
  //   console.log(e.target.files[0]);
  //  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (id === null) {
      alert("id 입력하세요.");
      return;
    }

    if (password === "") {
      alert("password 입력하세요.");
      return;
    }
    if (name === "") {
      alert("name 입력하세요.");
      return;
    }
    if (phone === "") {
      alert("phone 입력하세요.");
      return;
    }

    if (password !== checkPassword) {
      alert("password 불일치");
      return;
    }
    const file = e.target["file"].files[0];
    registerUser(file);
  };

  const registerUser = async (file) => {
    const formData = new FormData();
    formData.append("id", document.getElementById("id").value);
    formData.append(
      "password",
      sha256(document.getElementById("password").value)
    );
    formData.append("name", document.getElementById("name").value);
    formData.append("phone", phone.replace(/\-/g, ""));
    formData.append("role", "user");
    formData.append("file", file);  

    console.log("file 데이터: ", file);
    console.log("formData 데이터: ", typeof(formData));   // type: Object
    // for (let key of formData.keys()) {
    //   console.log(`${key}: ${formData.get(key)}`);
    // }
    
    await customFetch(`/api/user`, { headers: { Accept: "application/json", Authorization: localStorage.getItem("token")}, method: "post", body: formData }).then(
      () => alert("회원가입 성공하셨습니다.")
    );
  };
  return (
    <div>
      <h1>사원 관리</h1>
      <br></br>
      <FormControl component="form" onSubmit={handleRegisterSubmit}>
        <TextField
          type="text"
          id="id"
          label="id"
          name="id"
          variant="outlined"
          size="small"
          onChange={(e) => setId(e.target.value)}
        />
        <Typography id="issue-id">
          {id !== "" ? " " : "id가 빈값입니다."}{" "}
        </Typography>
        <br></br>
        <TextField
          type="password"
          id="password"
          label="password"
          name="password"
          variant="outlined"
          size="small"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Typography id="issue-password">
          {password !== "" ? " " : "password가 빈값입니다."}
        </Typography>
        <br></br>
        <TextField
          type="password"
          id="check-password"
          label="check-password"
          name="check-password"
          variant="outlined"
          size="small"
          onChange={(e) => setCheckPassword(e.target.value)}
        />
        <Typography id="issue-check-password">
          {checkPassword !== "" ? " " : "checkPassword이 빈값입니다."}
        </Typography>
        <br></br>
        <TextField
          type="text"
          id="name"
          label="name"
          name="name"
          size="small"
          onChange={(e) => setName(e.target.value)}
        />
        <Typography id="issue-name">
          {name !== "" ? " " : "name가 빈값입니다."}
        </Typography>
        <br></br>
        <TextField
          type="text"
          id="phone"
          label="phone"
          name="phone"
          size="small"
          value={phone}
          onChange={handlePhone}
        />
        <Typography id="issue-phone">
          {phone !== "" ? " " : "phone가 빈값입니다."}
        </Typography>
        <br></br>

        <TextField
          id="file"
          name="file"
          type="file"
          variant="outlined"
          size="small"
          sx={{
            marginTop: 2,
          }}
        />
        <Button type="submit" variant="outlined">
          Register
        </Button>
      </FormControl>
    </div>
  );
};

export default Register;
