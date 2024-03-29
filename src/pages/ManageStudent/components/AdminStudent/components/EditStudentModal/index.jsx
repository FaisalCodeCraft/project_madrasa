import { Box, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import StudentModal from "../StudentModal";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "config/firerBase";
import { deleteStudent } from "services/student";

const EditStudentModal = (props) => {
  const { studentData } = props;
  const [studentModal, setStudentModal] = useState(false);

  const handleDelete = async (id) => {
    deleteStudent(id);
  }

  return (
    <React.Fragment>
      <Box
        mr={3}
        sx={{
          background: "#ffffff",
          position: "absolute",
          boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.11)",
          borderRadius: "8px",
          width: "120px",
          right: 15,
          top: 0,
          zIndex: 999,
        }}
      >
        <Typography
          px={2}
          py={2}
          fontSize="14px"
          fontWeight="600"
          onClick={() => setStudentModal(true)}
          sx={{ cursor: "pointer" }}
        >
          Edit
        </Typography>
        <Divider />
        <Typography
          px={2}
          py={2}
          fontSize="14px"
          fontWeight="600"
          onClick={() => handleDelete(studentData?.id)}
          sx={{ cursor: "pointer" }}
        >
          Delete
        </Typography>
      </Box>
      {studentModal && (
        <StudentModal
          isUpdate={true}
          studentData={studentData}
          title="Update Student"
          studentModal={studentModal}
          onClose={() => setStudentModal(false)}
        />
      )}
    </React.Fragment>
  );
};

export default EditStudentModal;
