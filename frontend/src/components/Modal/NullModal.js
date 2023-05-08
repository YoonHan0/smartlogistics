import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Modal,
} from "@mui/material";


const NullModal = ({ open, onClose }) => {


  return (
    <Box>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 230,
            height: 130,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 5,
            p: 3,
          }}
        >
          <Box
            variant="h6"
            sx={{
              fontSize: "20px",
              mb: "20px",
            }}
          >
            삭제
          </Box>
          <Box
            sx={{
                fontSize: "13px",
                mb: "20px",
            }}
          >
            {"체크된 데이터가 존재하지 않습니다."}
            
          </Box>
          <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
            }}
        >
            <Button
                onClick={onClose}>
                확인
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default NullModal;