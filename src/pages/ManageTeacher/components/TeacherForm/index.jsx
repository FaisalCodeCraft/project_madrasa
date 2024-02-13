import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { COLORS } from "constant/colors";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  adminTeacherFormSchema,
  updateAdminTeacherFormSchema,
} from "validations";
import { useForm } from "react-hook-form";
import { EDUCATION, FILTER_BY_CLASS, SPECIALITY } from "constant/content";
import { Container, Grid, MenuItem, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import ROUTES from "constant/routes";
import { useLocation, useNavigate } from "react-router-dom";
import AdminLayout from "components/AdminLayout";

import { addTeacher, updateTeacher } from "services/teacher";

const TeacherForm = (props) => {

  const { title } = props || {};
  const navigate = useNavigate();

  const location = useLocation();

  const teacherData = location?.state?.data;
  const isUpdate = location?.state?.isUpdate

  const [isEmailExist, setIsEmailExist] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    trigger,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(isUpdate ? updateAdminTeacherFormSchema : adminTeacherFormSchema),
  });

  const [image, setImage] = React.useState(
    teacherData?.profileImage && teacherData?.profileImage
  );

  const handleChange = (e) => {
    if (e?.target.files) {
      setValue("profileImage", e?.target?.files[0]);
      setImage(URL.createObjectURL(e?.target?.files[0]));
      trigger("profileImage");
    }
  };

  React.useEffect(() => {
    teacherData && setValue("profileImage", teacherData?.profileImage);
  }, []);


  const handleSumbitForm = async (values) => {
    try {
      setIsLoading(true)
      if (isUpdate) {
        await updateTeacher(values, teacherData)
        navigate(ROUTES.ADMIN.TEACHERS)
      } else {
        await addTeacher(values)
      }
    } catch (error) {
      console.log(error?.message)
    }
    finally {
      setIsLoading(false)

    }


  };
  return (
    <AdminLayout title="Add Teacher" >
      <form onSubmit={handleSubmit(handleSumbitForm)} >
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Typography fontSize="20px" fontWeight={800} fontFamily="Mulish">
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
                <TextField
                  select
                  fullWidth
                  defaultValue={teacherData?.class ? teacherData?.class : "Class 1st"}
                  {...register("classAssign")}
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
                  select
                  fullWidth
                  defaultValue={teacherData?.education ? teacherData?.education : "Graduate"}
                  {...register("education")}
                  error={errors.education ? true : false}
                  helperText={
                    errors.education ? <> {errors.education?.message} </> : ""
                  }
                >
                  {EDUCATION.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  select
                  fullWidth
                  defaultValue={teacherData?.speciality ? teacherData?.speciality : "Art"}
                  {...register("speciality")}
                  error={errors.speciality ? true : false}
                  helperText={
                    errors.speciality ? <> {errors.speciality?.message} </> : ""
                  }
                >
                  {SPECIALITY.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}>
            {/* Right side content */}
            <Grid container spacing={3}>
              <Grid item md={12} xs={12} mt={1}>
                <TextField
                  fullWidth
                  defaultValue={teacherData?.fullName}
                  placeholder="Full Name"
                  {...register("fullName")}
                  error={errors?.fullName ? true : false}
                  helperText={
                    errors?.fullName ? <>{errors.fullName?.message} </> : ""
                  }
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  defaultValue={teacherData?.email}
                  onFocus={() => setIsEmailExist(false)}
                  placeholder="Email"
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
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  defaultValue={teacherData?.contact}
                  placeholder="Contact No"
                  {...register("contact")}
                  error={errors.contact ? true : false}
                  helperText={
                    errors.contact ? <>{errors.contact?.message} </> : ""
                  }
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  defaultValue={teacherData?.country}
                  placeholder="Country"
                  {...register("country")}
                  error={errors.country ? true : false}
                  helperText={
                    errors.country ? <>{errors.country?.message} </> : ""
                  }
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  defaultValue={teacherData?.city}
                  placeholder="City"
                  {...register("city")}
                  error={errors.city ? true : false}
                  helperText={errors.city ? <>{errors.city?.message} </> : ""}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  defaultValue={teacherData?.status}
                  placeholder="Status"
                  {...register("status")}
                  error={errors.status ? true : false}
                  helperText={
                    errors.status ? <>{errors.status?.message} </> : ""
                  }
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  multiline
                  fullWidth
                  defaultValue={teacherData?.about}
                  placeholder="Write Something About Yourself"
                  {...register("about")}
                  error={errors.about ? true : false}
                  helperText={errors.about ? <>{errors.about?.message} </> : ""}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box mt={5} display="flex" justifyContent="space-around">
          <Button
            onClick={() => navigate(ROUTES.ADMIN.TEACHERS)}
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
            className={isValid || isUpdate ? "MuiButton-primary" : "MuiButton-light"}
            sx={{
              py: 2,
              px: 5,
              borderRadius: 50,
            }}
          >
            {isUpdate ? "Update Teacher" : "Add Teacher"}
          </LoadingButton>
        </Box>
      </form>
    </AdminLayout>
  );
};
export default TeacherForm;



const mainBox = {
  width: "240px",
  height: "240px",
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
