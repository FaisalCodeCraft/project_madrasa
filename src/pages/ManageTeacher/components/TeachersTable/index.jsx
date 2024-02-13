import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ArrowForward, MoreVert, Padding } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  Pagination,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "constant/routes";
import TeacherStatus from "../TeacherStatus";

const TeachersTable = (props) => {
  const { teachersData } = props;

  const navigate = useNavigate();

  const [teacherStatus, setTeacherStatus] = React.useState(false);

  const onCurrentPage = 5;

  const [teachersId, setTeachersId] = React.useState("");
  const [page, setPage] = React.useState(1);
  const handleChange = (e, data) => {
    setPage(data);
  };
  const teachers = page * onCurrentPage;
  const remainingTeachers = teachers - onCurrentPage;

  return (
    <TableContainer component={Paper} sx={{ mb: 4 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className="MuiTableCell-tableHead">Profile</TableCell>
            <TableCell className="MuiTableCell-tableHead">Full Name</TableCell>
            <TableCell className="MuiTableCell-tableHead">
              Qualification
            </TableCell>
            <TableCell className="MuiTableCell-tableHead">
              Class Asign
            </TableCell>
            <TableCell className="MuiTableCell-tableHead">Contact</TableCell>
            <TableCell className="MuiTableCell-tableHead">City</TableCell>
            <TableCell className="MuiTableCell-tableHead">Status</TableCell>
            <TableCell className="MuiTableCell-tableHead"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachersData
            .slice(remainingTeachers, teachers)
            .map((teacherData, id) => (
              <TableRow hover key={id}>
                <TableCell>
                  <img
                    src={teacherData.profileImage}
                    alt="student logo"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                    }}
                  />
                </TableCell>
                <TableCell>{teacherData.fullName}</TableCell>
                <TableCell>{teacherData.education}</TableCell>
                <TableCell>{teacherData.classAssign}</TableCell>
                <TableCell>{teacherData.contact}</TableCell>
                <TableCell>{teacherData.city}</TableCell>
                <TableCell>
                  <IconButton aria-label="settings">
                    <MoreVert
                      onClick={() => {
                        setTeachersId(teacherData.id);
                        setTeacherStatus(!teacherStatus);
                      }}
                    />
                    {teacherStatus && teachersId === teacherData?.id && (
                      <TeacherStatus />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <ArrowForward
                    onClick={() =>
                      navigate(ROUTES.ADMINTEACHER.TEACHERFORM, {
                        state: {
                          data: teacherData,
                          isUpdate: true 
                        },

                      })
                    }
                    sx={{ cursor: "pointer" }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Divider />
      <Stack spacing={2}>
        <Pagination
          style={style}
          count={Math.ceil(teachersData.length / onCurrentPage)}
          page={page}
          color="secondary"
          onChange={handleChange}
        />
      </Stack>
    </TableContainer>
  );
};

export default TeachersTable;
const style = {
  margin: "auto",
  padding: "1.2em",
};
