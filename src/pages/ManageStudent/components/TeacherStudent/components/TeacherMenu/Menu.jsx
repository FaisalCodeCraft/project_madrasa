import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { attendanceSchema } from 'validations';
import { ATTENDANCE } from 'constant/content';
import { handleUpdate } from 'services/stdTeacher';
import { useAuthContext } from 'context/authContext';




export default function CustomizedMenus(props) {
  const { tableData, user, teaClass, status, setIsLoading } = props || {}
  const context = useAuthContext()
  const currentDate = new Date().toLocaleDateString().replaceAll("/", "-").toString();
  const Status = status === 'Present' ? 'Present' :
    status === 'Absent' ? 'Absent' :
      status === 'Leave' ? 'Leave' : 'Nill'

  const {
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(attendanceSchema)
  })




  const test = context?.oldDate === currentDate

  const singleStdAttendance = async (e) => {
    await setIsLoading(true)

    const id = user
    const data = tableData[id].status = e.target.value
    handleUpdate(tableData, teaClass, setIsLoading)
    setIsLoading(false)
  }



  return (
    <div >
      <form >
        <TextField
          select
          fullWidth
          defaultValue={"Nill"}
          onChange={(e) => singleStdAttendance(e)}
          value={Status ?? "Nill"}
          error={errors.class ? true : false}
          helperText={
            errors.class ? <> {errors.class?.message} </> : ""
          }
        >
          <MenuItem disabled value={'Nill'}>
            Nill
          </MenuItem>
          {ATTENDANCE.map((option, i) => (
            <MenuItem disabled={!test} key={i} value={option}>
              {option}

            </MenuItem>

            // <Typography
            //   sx={{ width: '150px' }}
            // >
            //   {modal}
            // </Typography>
          ))}
        </TextField>

      </form>

    </div >
  );
};

