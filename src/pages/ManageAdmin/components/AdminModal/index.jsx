import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { adminFormSchema, updateAdminFormSchema } from "validations";
import { COLORS } from "constant/colors";
import { ADMIN_ROLE } from "constant/content";


const AdminModal = (props) => {
  const { title, onClose, adminModal, setAddAdminModal, adminData, isUpdate } =
    props || {};

  const [isEmailExist, setIsEmailExist] = React.useState(false);

  const [admin, setAdmin] = React.useState("");

  const [isSuccessModal, setIsSuccessModal] = React.useState(false);

  const {
    trigger,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(isUpdate ? updateAdminFormSchema : adminFormSchema),
  });

  // console.log(errors);

  const [image, setImage] = React.useState(
    adminData?.profileImage && adminData?.profileImage
  );

  const handleChange = (e) => {
    if (e?.target.files) {
      setValue("profileImage", e?.target?.files[0]);
      setImage(URL.createObjectURL(e?.target?.files[0]));
      trigger("profileImage");
    }
  };

  React.useEffect(() => {
    adminData && setValue("profileImage", adminData?.profileImage);
    //eslint-disable-next-line
  }, []);

  const formSubmitHandler = async (values) => {
    console.log(values, ">>>>>>>>>>>>");
  };

  return (
    <React.Fragment>
      <Modal
        open={adminModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <Box sx={style}>
            <Typography
              mt={2}
              fontSize="20px"
              fontWeight={800}
              textAlign="center"
              fontFamily="Mulish"
            >
              {title}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              justifyContent="center"
            >
              <Box sx={mainBox}>
                {image && (
                  <img
                    width="100%"
                    height="100%"
                    style={{
                      borderRadius: "100%",
                      border: `1px solid ${COLORS.secondary.main}`,
                      cursor: "pointer",
                      objectFit: "cover",
                    }}
                    src={image}
                    alt="thumbnail"
                  />
                )}
              </Box>
              <label style={{ marginTop: "10px" }} htmlFor="img">
                <Box sx={uploadButton}>Upload New Photo</Box>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChange(e)}
                  id="img"
                  style={{ display: "none" }}
                />
              </label>
            </Box>
            {errors?.profileImage?.message && !image && (
              <Typography
                textAlign={"center"}
                mt={1}
                sx={{ color: COLORS.error.light }}
                fontSize={{ md: 15, sm: 12, xs: 10 }}
                variant="body1"
              >
                please chose a profile image
              </Typography>
            )}
            <Box my={2} sx={Styles.TextFields__Wrapper}>
              <TextField
                select
                defaultValue={
                  adminData?.role ? adminData?.role : "Administrator"
                }
                {...register("role")}
                error={errors.role ? true : false}
                helperText={errors.role ? <> {errors.role?.message} </> : ""}
              >
                {ADMIN_ROLE.map((option, i) => (
                  <MenuItem key={i} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                defaultValue={adminData?.firstName}
                placeholder="First Name"
                {...register("firstName")}
                error={errors.firstName ? true : false}
                helperText={
                  errors.firstName ? <>{errors.firstName?.message} </> : ""
                }
              />

              <TextField
                defaultValue={adminData?.lastName}
                placeholder="Last Name"
                {...register("lastName")}
                error={errors.lastName ? true : false}
                helperText={
                  errors.lastName ? <>{errors.lastName?.message} </> : ""
                }
              />

              <TextField
                onFocus={() => setIsEmailExist(false)}
                placeholder="Admin Email"
                {...register("email")}
                error={errors.email ? true : isEmailExist ? true : false}
                helperText={
                  errors.email ? (
                    <>{errors.email?.message} </>
                  ) : isEmailExist ? (
                    "The email is already in use"
                  ) : (
                    ""
                  )
                }
              />

              <TextField
                type="password"
                placeholder="Password"
                {...register("password")}
                error={errors.password ? true : false}
                helperText={
                  errors.password ? <>{errors.password?.message} </> : ""
                }
              />

              <TextField
              defaultValue={adminData?.phoneNumber}
                onFocus={() => setIsEmailExist(false)}
                placeholder="Phone No:"
                {...register("phoneNumber")}
                error={errors.phoneNumber ? true : false}
                helperText={
                  errors.phoneNumber ? <>{errors.phoneNumber?.message} </> : ""
                }
              />
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Button
                onClick={onClose}
                fullWidth
                sx={{
                  py: 2,
                  borderRadius: 50,
                  color: COLORS.dark.main,
                  background: COLORS.grey.lighter,
                }}
              >
                cancel
              </Button>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                // loading={!!isLoading}
                // disabled={!!isLoading}
                className={isValid ? "MuiButton-primary" : "MuiButton-light"}
                sx={{
                  ml: 2,
                  py: 2,
                  borderRadius: 50,
                }}
              >
                {adminData ? "Update Admin" : "Add Admin"}
               
              </LoadingButton>
            </Box>
          </Box>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default AdminModal;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  height: "90vh",
  overflowY: "scroll",
  "::-webkit-scrollbar": {
    width: "10px",
  },
  "::-webkit-scrollbar-thumb": {
    background: COLORS.primary.main,
    borderRadius: "8px",
  },
};

const Styles = {
  TextFields__Wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
    "& .MuiInputBase-root": {
      height: "60px",
      fontWeight: "500",
      fontSize: "16px",
      color: "#454546",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #454546",
    },
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      border: "1.5px solid #cb2c2c",
    },
  },
};

const mainBox = {
  width: "150px",
  height: "150px",
  background: " #F1F1F1",
  border: "1px solid #D3D3D3",
  borderRadius: "100%",
};
const uploadButton = {
  background:
    "linear-gradient(90deg, #042A9E 0%, #052B9F 6.25%, #072CA1 12.5%, #0A2FA4 18.75%, #0E32A8 25%, #1336AD 31.25%, #193BB3 37.5%, #2040BA 43.75%, #2745C1 50%, #2D4AC7 56.25%, #344FCE 62.5%, #3A54D4 68.75%, #3F58D9 75%, #435BDD 81.25%, #465EE0 87.5%, #485FE2 93.75%, #4960E3 100%)",
  color: "white",
  padding: "10px 15px",
  fontFamily: "Inter",
  fontWeight: "500",
  fontSize: "14px",
  fontStyle: "normal",
  borderRadius: "50px",
  cursor: "pointer",
};
