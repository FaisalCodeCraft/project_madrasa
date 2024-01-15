import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreOptionModal from "../MoreOptionModal";
import { COLORS } from "constant/colors";
import { Alert, Snackbar } from "@mui/material";



const AdminCard = (props) => {
  const { data } = props || {};


  const [moreOptionModal, setMoreOptionModal] = React.useState(false);

  const [isRoleError, setIsRoleError] = React.useState(false);

  return (
    <React.Fragment>
      <Card
        elevation={0}
        sx={{
          border: `2px solid ${COLORS.grey.main}`,
          backgroundColor: COLORS.grey.light,
          position: "relative",
          borderRadius: "12px",
        }}
        
      >
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon
               onClick={() => setMoreOptionModal(!moreOptionModal)} />
            </IconButton>
          }
        />
        {moreOptionModal && <MoreOptionModal data={data} />}
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CardMedia
            height="90"
            component="img"
            alt="Profile Image"
            image={data.profileImage}
            sx={{ width: 90, borderRadius: 50 }}
          />
          <CardContent>
            <Box
              mt={2}
              display="flex"
              flexWrap="wrap"
              flexDirection="column"
              sx={{ textAlign: "center" }}
            >
              <Typography fontSize="18px" fontWeight="700" fontFamily="Inter">
              <Typography
                fontSize="14px"
                fontWeight="400"
                fontFamily="Inter"
                color="rgba(0, 0, 0, 0.5)"
              >
                {data?.role}
              </Typography>
                {data?.firstName + " " + data?.lastName}
              </Typography>
            </Box>
            <Typography
              mt={"20px"}
              fontSize="14px"
              fontWeight="400"
              fontFamily="Inter"
            >
              {data.email}
            </Typography>
            <Typography
              mt={"5px"}
              fontSize="14px"
              fontWeight="400"
              fontFamily="Inter"
            >
              {data.phoneNumber}
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <Snackbar
        open={Boolean(isRoleError)}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: "100%", mt: "1%", mr: "5%" }}
          onClose={() => setIsRoleError(false)}
        >
          Current Admin does not have Permission
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default AdminCard;
