import React from "react";
import { Box, Modal, Button } from "@mui/material";

export default function SelectedDataDeleteModal({
  open,
  handleClose,
  modalMessage,
  checkedButtons,
  onDeleteButton,
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 230,
          height: 110,
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
          {modalMessage()}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {checkedButtons.length === 0 ? undefined : (
            <Button onClick={onDeleteButton}>확인</Button>
          )}
          <Button onClick={handleClose}>취소</Button>
        </Box>
      </Box>
    </Modal>
  );
}
