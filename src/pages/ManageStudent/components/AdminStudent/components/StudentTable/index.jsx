import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ArrowForward, MoreVert, Padding } from "@mui/icons-material";
import { Divider, IconButton, Pagination, Stack, Typography } from "@mui/material";
import EditStudentModal from "../EditStudentModal";

const StudentTable = (props) => {
  const {studentData}=props
  const [editStudentModal, setEditStudentModal] = React.useState(false);
  const onCurrentPage = 5;
  const [studentId, setStudentId] = React.useState("");
  const [page, setPage] = React.useState(1);
  const handleChange = (e, data) => {
    setPage(data);
  };
  const abc = page * onCurrentPage;
  const bca = abc - onCurrentPage;

  return (
    <TableContainer component={Paper}sx={{mb:4}}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow  >
            <TableCell className="MuiTableCell-tableHead">Profile</TableCell>
            <TableCell className="MuiTableCell-tableHead">Roll No:</TableCell>
            <TableCell className="MuiTableCell-tableHead">Full Name</TableCell>
            <TableCell className="MuiTableCell-tableHead">F/Name</TableCell>
            <TableCell className="MuiTableCell-tableHead">Contact</TableCell>
            <TableCell className="MuiTableCell-tableHead">City</TableCell>
            <TableCell className="MuiTableCell-tableHead">Status</TableCell>
            <TableCell className="MuiTableCell-tableHead"> </TableCell>
            <TableCell className="MuiTableCell-tableHead"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentData.slice(bca,abc).map((studentData, id) => (
            <TableRow hover key={id} >
              <TableCell>
                <img
                  src={studentData?.profileImage}
                  alt="student logo"
                  style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                />
              </TableCell>
              <TableCell>{studentData.rNo}</TableCell>
              <TableCell>{studentData.fullName}</TableCell>
              <TableCell>{studentData.fatherName}</TableCell>
              <TableCell>{studentData.contactNo}</TableCell>
              <TableCell>{studentData.city}</TableCell>
              <TableCell>{studentData.status}</TableCell>
              <TableCell>
                <IconButton aria-label="settings">
                  <MoreVert
                    onClick={() => {
                      setStudentId(studentData.id);
                      setEditStudentModal(!editStudentModal);
                    }}
                  />
                  {editStudentModal && studentId === studentData?.id && (
                    <EditStudentModal studentData={studentData} />
                  )}
                </IconButton>
              </TableCell>
              <TableCell>
                <ArrowForward />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Divider/>
      <Stack spacing={2}>
        <Pagination
         style={style}
        
          count={Math.ceil(studentData.length / onCurrentPage)}
          page={page}
          color="secondary"
          onChange={handleChange}
        />
      </Stack>
    </TableContainer>
  );
};

export default StudentTable;
const style={
  margin:"auto",
  padding:"1.2em",
}

