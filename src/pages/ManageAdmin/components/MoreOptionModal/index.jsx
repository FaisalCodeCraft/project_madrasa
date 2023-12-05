import React from "react";
import Box from "@mui/material/Box";
import { Divider, Typography } from "@mui/material";
import { COLORS } from "constant/colors";
import AdminModal from "../AdminModal";

// type Props = {

// };

const MoreOptionModal = (props) => {
  const { data } = props;

  const [adminModal, setAdminModal] = React.useState(false);

  const [isConfirmModal, setIsConfirmModal] = React.useState(false);

  const [isSuccessModal, setIsSuccessModal] = React.useState(false);

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
          sx={{cursor:"pointer"}}
        >
          Edit
        </Typography>
        <Divider  />
        <Typography
          px={2}
          py={2}
          fontSize="14px"
          fontWeight="600"
          onClick={() => setIsConfirmModal(true)}
          sx={{cursor:"pointer"}}

        >
          Delete
        </Typography>
      </Box>

      {adminModal && (
        <AdminModal
          adminData={data} 
          isUpdate={true}
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
