import { Box, Button, Toolbar } from "@mui/material";
import styled from 'styled-components';
import React from "react";
import Logo from "./Logo";
import img from '../../assets/img/logo.png';

// Toolbar 컴포넌트 재정의, makeStyles는 버전 문제로 패키지 다운이 안되서 styled 사용했음
const StyledToolbar = styled(Toolbar)`  
  padding: 0px;
  height: 50px;
  display: flex;
  justify-content: space-between;
`;

const Header = ({info}) => {
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '8px',
        marginBottom: '20px',
      }}
    >
      <StyledToolbar>
        <Box
          component="div"
          sx={{
            p:0,
            // marginTop: '10px',
            // marginBottom: '20px',
            height: '80px',
            textAlign: 'center',
            display: 'flex',
            lineHeight: '80px',
            alignItems: 'center',
          }}>
          <img src={img} width="50px" height="46px" alt="image" />
          <Box
            sx={{
              display: 'block',
              float: 'left',
              marginLeft: '5px',
            }}>
            <a href="/" style={{ textDecoration: "none" }}>
              <Logo/>
            </a>
          </Box>
        </Box>
        <Box>
          <img src={info.profile} width="10px" height="10px" alt="img" /> {/* 이미지는 DB에 어떻게 저장되냐에 따라서 경로를 추가해주면 될듯 */}
          {info.user.jwt === "admin" ? <span>{info.name} 관리자님</span> : <span>{info.name} 사용자님</span>}
          {/* role을 보고 'admin'이면 name+관리자님 | 'user'이면 name+사용자님 */}
        </Box>
      </StyledToolbar>
    </Box>
  );
};

export default Header;