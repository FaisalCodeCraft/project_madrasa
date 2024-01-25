import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { COLORS } from "constant/colors";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  adminStudentFormSchema,
  updateAdminStudentFormSchema,
} from "validations";
import { useForm } from "react-hook-form";
import { FILTER_BY_CLASS } from "constant/content";
import { Container, Grid, MenuItem, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "config/firerBase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addNewStudent, updateExistingStd } from "services/student";

const StudentModal = (props) => {
  const { title, onClose, studentModal, studentData, isUpdate } = props || {};
  const [isEmailExist, setIsEmailExist] = React.useState(false)



  const {
    trigger,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(isUpdate ? updateAdminStudentFormSchema : adminStudentFormSchema),
  });


  const [image, setImage] = React.useState(
    studentData?.profileImage && studentData?.profileImage
  );

  const [isLoading, setIsLoading] = React.useState(false)



  const handleChange = (e) => {
    if (e?.target.files) {
      setValue("profileImage", e?.target?.files[0]);
      setImage(URL.createObjectURL(e?.target?.files[0]));
      trigger("profileImage");
    }

  };
  React.useEffect(() => {
    studentData && setValue("profileImage", studentData?.profileImage);
    // image && uploadImg()
  }, []);


  const  onSubmitForm = async (data) => {
    // console.log(data, "///////////////////");
    try {
      setIsLoading(true);

      if (isUpdate) {
        await updateExistingStd(data, studentData)
      }
      else {
        await addNewStudent(data)
      }

      setIsLoading(false)
      onClose()

    } catch (error) {
      setIsLoading(false)
      console.log(error.message)
    }

    // console.log(data)
  };


  return (
    <div>
      <Modal
        open={studentModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Container maxWidth={false}>

            <form onSubmit={handleSubmit( onSubmitForm)}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Typography
                    fontSize="20px"
                    fontWeight={800}
                    fontFamily="Mulish"
                  >
                    {title}

                  </Typography>
                  {/* Left side content */}
                  <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                      <Box
                        mb={2}
                        width="100%"
                        height="auto"
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
                        <label style={{ marginTop: "7px" }} htmlFor="img">
                          <Box sx={uploadButton}
                          // onClick={uploadImg}
                          >Upload New Photo
                          </Box>
                          <input
                            type="file"
                            onChange={(e) => handleChange(e)}
                            id="img"
                            style={{ display: "none" }}
                          />
                        </label>
                      </Box>
                      {errors?.profileImage?.message && (
                        <Typography
                          textAlign={"center"}
                          sx={{ color: COLORS.error.light }}
                          fontSize={{ md: 15, sm: 12, xs: 10 }}
                          variant="body1"
                        >
                          please chose a profile image
                        </Typography>
                      )}
                    </Grid>
                    <Grid item md={12} xs={12}>
                      {/* <Controller
                      name="class"
                      control={control}
                      defaultValue={
                        studentData?.class
                          ? studentData.class
                              .filter(
                                (value) => value !== null && value !== undefined
                              )
                              .map(String)
                          : ["English"]
                      }
                      render={({ field, fieldState: { error } }) => (
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          multiple
                          fullWidth
                          value={field.value}
                          input={<OutlinedInput error={!!error} />}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          {FILTER_BY_CLASS.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    /> */}
                      <TextField
                        select
                        fullWidth
                        defaultValue={
                          studentData?.class ? studentData?.class : "Class 1st"
                        }
                        {...register("class")}
                        error={errors.class ? true : false}
                        helperText={
                          errors.class ? <> {errors.class?.message} </> : ""
                        }
                      >
                        {FILTER_BY_CLASS.map((option, i) => (
                          <MenuItem key={i} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        defaultValue={studentData?.country}
                        placeholder="Country"
                        {...register("country")}
                        error={errors.country ? true : false}
                        helperText={
                          errors.country ? <>{errors.country?.message} </> : ""
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={6} xs={12}>
                  {/* Right side content */}
                  <Grid container spacing={3}>
                    <Grid item md={12} xs={12} mt={1}>
                      <TextField
                        fullWidth
                        defaultValue={studentData?.fullName}
                        placeholder="Full Name"
                        {...register("fullName")}
                        error={errors?.fullName ? true : false}
                        helperText={
                          errors?.fullName ? (
                            <>{errors.fullName?.message} </>
                          ) : (
                            ""
                          )
                        }
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        defaultValue={studentData?.fatherName}
                        fullWidth
                        placeholder="Father Name"
                        {...register("fatherName")}
                        error={errors.fatherName ? true : false}
                        helperText={
                          errors.fatherName ? (
                            <>{errors.fatherName?.message} </>
                          ) : (
                            ""
                          )
                        }
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        defaultValue={studentData?.email}
                        onFocus={() => setIsEmailExist(false)}
                        placeholder="Email"
                        {...register("email")}
                        error={
                          errors.email ? true : isEmailExist ? true : false
                        }
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
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        defaultValue={studentData?.contactNo}
                        placeholder="Contact No"
                        {...register("contactNo")}
                        error={errors.contactNo ? true : false}
                        helperText={
                          errors.contactNo ? (
                            <>{errors.contactNo?.message} </>
                          ) : (
                            ""
                          )
                        }
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        defaultValue={studentData?.city}
                        placeholder="City"
                        {...register("city")}
                        error={errors.city ? true : false}
                        helperText={
                          errors.city ? <>{errors.city?.message} </> : ""
                        }
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        defaultValue={studentData?.status}
                        placeholder="Status"
                        {...register("status")}
                        error={errors.status ? true : false}
                        helperText={
                          errors.status ? <>{errors.status?.message} </> : ""
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box mt={5} display="flex" justifyContent="space-around">
                <Button
                  onClick={onClose}
                  sx={{
                    py: 2,
                    px: 5,
                    borderRadius: 50,
                    color: COLORS.dark.main,
                    background: COLORS.grey.lighter,
                  }}
                >
                  cancel
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={!!isLoading}
                  disabled={!!isLoading}
                  className={isValid ? "MuiButton-primary" : "MuiButton-light"}
                  sx={{
                    py: 2,
                    px: 5,
                    borderRadius: 50,
                  }}
                >
                  {isUpdate ? "Update User" : "Add User"}
                </LoadingButton>
              </Box>
            </form>
          </Container>
        </Box>
      </Modal>
    </div>
  );
};
export default StudentModal;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "80vh",
  overflowY: "scroll",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
  overflowY: "scroll",
  "::-webkit-scrollbar": {
    width: "10px",
  },
  "::-webkit-scrollbar-thumb": {
    background: COLORS.primary.main,
    borderRadius: "8px",
  },
};

const mainBox = {
  width: "210px",
  height: "210px",
  background: COLORS.grey.gray,
  border: "2px solid #D3D3D3",
  borderRadius: "100%",
};

const uploadButton = {
  background:
    "linear-gradient(90deg, #042A9E 0%, #052B9F 6.25%, #072CA1 12.5%, #0A2FA4 18.75%, #0E32A8 25%, #1336AD 31.25%, #193BB3 37.5%, #2040BA 43.75%, #2745C1 50%, #2D4AC7 56.25%, #344FCE 62.5%, #3A54D4 68.75%, #3F58D9 75%, #435BDD 81.25%, #465EE0 87.5%, #485FE2 93.75%, #4960E3 100%)",
  color: "white",
  padding: "10px 15px",
  fontFamily: "Inter",
  fontWeight: "500",
  fontSize: "16px",
  fontStyle: "normal",
  borderRadius: "50px",
  cursor: "pointer",
};
