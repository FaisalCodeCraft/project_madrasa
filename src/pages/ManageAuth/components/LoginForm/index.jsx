import React, { useState } from "react";
import Box from "@mui/system/Box";
import Paper from "@mui/material/Paper";
import ROUTES from "constant/routes";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Snackbar } from "@mui/material";
import { loginFormSchema } from "validations";
import { useForm, Controller,  } from "react-hook-form";
import { useAuthContext } from "context/authContext";
import { auth } from "config/firerBase";
import { signInWithEmailAndPassword } from 'firebase/auth'

const LoginForm = (props) => {
  const navigate = useNavigate();

  const context = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);


  

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginFormSchema),
  });

  const formSubmitHandler = async (values) => {
    setIsLoading(true);
    if (values.email === "admin@gmail.com" && values.password === "Admin@123") {
      context.updateUser({
        firstName: "admin",
        lastName: "test",
        role: "Super Admin",
        email: "admin@gmail.com",
        address: "test address",
        phoneNumber: "1234567890",
        photoURL: "assets/icons/logo.jpg",
        type: "admin",
      });
      setIsLoading(false);
      navigate(ROUTES.COMMON.DASHBOARD);
    } else if (
      values.email === "teacher@gmail.com" &&
      values.password === "Teacher@123"
    ) {
      setIsLoading(false);
      context.updateUser({
        type: "teacher",
        firstName: "teacher",
        lastName: "test",
        role: "Teacher",
        email: "teacher@gmail.com",
        address: "test address",
        phoneNumber: "1234567890",
        photoURL: "assets/icons/logo.jpg",
      });
      navigate(ROUTES.COMMON.DASHBOARD);
    } else {
      setIsLoading(false);
      setIsError(true);
    }
    navigate(ROUTES.COMMON.DASHBOARD);

    const signInWithEp = async () => {
      // e.preventDefault()
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password)


      } catch (error) {
        console.log(error.message, "<<<<<invalid>>>>>>")
      }

    }
    signInWithEp();
  };

  const user = useAuthContext()

  React.useEffect(() => { 
    if (user) {
      navigate(ROUTES.ADMIN.ADMINS)
    }
  }, [])


  return (
    <React.Fragment>
      <Paper className="MuiPaper-auth-form">
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <Typography
            fontWeight={"500"}
            variant="h6"
            sx={{ textAlign: "center" }}
          >
            Sign In
          </Typography>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                focused
                type="email"
                {...field}
                error={!!errors.email}
                helperText={errors.email ? errors.email?.message : ""}
                sx={{ mt: 2 }}
                InputLabelProps={{
                  style: {
                    marginLeft: "2px",
                    fontWeight: "bold",
                    color: "black",
                  },
                }}
                label="Email"
                fullWidth
                color="secondary"
                variant="standard"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                focused
                error={!!errors.password}
                helperText={errors.password ? errors.password?.message : ""}
                {...field}
                type="password"
                sx={{ mt: 4 }}
                InputLabelProps={{
                  style: {
                    marginLeft: "2px",
                    fontWeight: "bold",
                    color: "black",
                  },
                }}
                label="Password"
                fullWidth
                variant="standard"
                color="secondary"
              />
            )}
          />
          <Box mt={5}>
            <LoadingButton
              loading={!!isLoading}
              disabled={!!isLoading}
              className={!isValid ? "MuiButton-light" : ""}
              type="submit"
              sx={{ py: 1.5 }}
              fullWidth
              variant="contained"
            >
              Sign In
            </LoadingButton>
           


          </Box>
        </form>
        <Box>

        </Box>
      </Paper>
      <Box>
        <Snackbar
          open={Boolean(isError)}
          autoHideDuration={1000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            severity="error"
            variant="filled"
            sx={{ width: "100%", mt: "1%", mr: "5%" }}
            onClose={() => setIsError(false)}
          >
            Invalid Credentials
          </Alert>
        </Snackbar>
      </Box>
    </React.Fragment>
  );
};

export default LoginForm;
