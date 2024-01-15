import React from "react";
import Box from "@mui/material/Box";
import { Button, Divider, Snackbar, Typography } from "@mui/material";
import { COLORS } from "constant/colors";
import AdminModal from "../AdminModal";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "config/firerBase";
import ConformModal from "../ConformModal";

// type Props = {

// };

const MoreOptionModal = (props) => {
  const { data } = props;

  const [adminModal, setAdminModal] = React.useState(false);





 

  return (
    <>
      <Box
        mr={3}
        sx={{
          background: "#ffffff",
          position: "absolute",
          boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.11)",
          borderRadius: "8px",
          width: "120px",
          right: 0,
          zIndex: 999,
        }}
      >
        <Typography
          px={2}
          py={2}
          fontSize="14px"
          fontWeight="600"
          onClick={() => setAdminModal(true)}
          sx={{ cursor: "pointer" }}
        >
          Edit
        </Typography>
        <Divider />

        <Typography
        >

          <ConformModal adminData={data}/>
        </Typography >


      </Box>

      {adminModal && (
        <AdminModal
          isUpdate={true}
          adminData={data}
          title="Update Admin"
          adminModal={adminModal}
          onClose={() => setAdminModal(false)}
          setAddAdminModal={setAdminModal}
        />
      )}
    </>
  );
};

export default MoreOptionModal;
