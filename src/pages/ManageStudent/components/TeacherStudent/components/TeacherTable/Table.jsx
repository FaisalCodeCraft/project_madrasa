import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Checkbox, Divider, Pagination, Stack, Typography, } from '@mui/material';
import CustomizedMenus from '../TeacherMenu/Menu';
import { COLORS } from 'constant/colors';
import { handleUpdate } from 'services/stdTeacher';
import { useAuthContext } from 'context/authContext';


const DenseTable = (props) => {
    const { tableData, setIsLoading } = props

    const itemsPage = 4;
    const context = useAuthContext()
    const currentDate = new Date().toLocaleDateString().replaceAll("/", "-").toString();

    const [currentPage, setCurrentPage] = React.useState(1);
    const handleChange = (e, value) => {
        setCurrentPage(value);
    };

    const [ids, setIds] = React.useState([])

    const onChecked = (id, i) => {

        if (ids.includes(id)) {
            const remove = ids.filter((e) => id !== e)
            setIds(remove)
        }
        else {
            setIds([...ids, id])

        }
    }

    const selectAll = () => {
        if (ids?.length === tableData?.length) {
            setIds([])
        } else {
            const studentIds = tableData?.map((user, index) => {
                return user?.studentId;
            })
            setIds(studentIds)
        }

    }

    const presentAll = async () => {
        const data = tableData.map((e) => {
            if (ids.includes(e.studentId)) {
                e.status = 'Present'
            }
            return e;
        })
        await handleUpdate(data, context?.user?.classAssign, setIsLoading)
        setIds([])
    }



    const LastItem = currentPage * itemsPage;
    const FirstItem = LastItem - itemsPage;

    if (tableData.length) {

        return (
            <Box mb={2}>
                <Box
                    display={context?.oldDate === currentDate ? "flex" : "none"}
                    justifyContent={"space-between"}
                >
                    <Button sx={btnStyle} onClick={selectAll}>Select All</Button>
                    <Button sx={btnStyle} onClick={presentAll}>Present</Button>
                </Box>
                <TableContainer component={Paper} elevation={10}>
                    <Table>
                        <TableHead>
                            <TableCell className="MuiTableCell-tableHead">Profile</TableCell>
                            <TableCell className="MuiTableCell-tableHead">Class Assign</TableCell>
                            <TableCell className="MuiTableCell-tableHead">Name</TableCell>
                            <TableCell className="MuiTableCell-tableHead">F/Name</TableCell>
                            <TableCell className="MuiTableCell-tableHead">Action </TableCell>
                        </TableHead>
                        <TableBody>
                            {tableData.slice(FirstItem, LastItem).map((row, i) => (
                                <TableRow hover>
                                    <TableCell sx={{ display: "flex" }}>
                                        <Checkbox
                                            sx={{ display: context?.oldDate === currentDate ? "block" : "none" }}
                                            checked={ids?.includes(row.studentId)}
                                            onChange={() => onChecked(row.studentId, i)}
                                        />
                                        <img
                                            src={row?.profileImage}
                                            alt="UserImage"
                                            width={'60px'}
                                            height={'60px'}
                                            style={{ borderRadius: '50%' }}
                                        />
                                    </TableCell>
                                    <TableCell>{row?.class}</TableCell>
                                    <TableCell>{row?.fullName}</TableCell>
                                    <TableCell>{row?.fatherName}</TableCell>
                                    <TableCell><CustomizedMenus
                                        user={i}
                                        status={row?.status}
                                        teaClass={row?.class}
                                        setIsLoading={setIsLoading}
                                        tableData={tableData}
                                    />
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Divider />
                    <Stack>
                        <Pagination
                            count={Math.ceil(tableData.length / itemsPage)}
                            page={currentPage}
                            onChange={handleChange}
                            color="primary"
                            style={pagination}
                        />
                    </Stack>
                </TableContainer>
            </Box >
        );
    } else {
        return (
            <Box>
                <Typography>Nothing is found</Typography>
            </Box>
        )

    }
}

export default DenseTable;

const pagination = {
    margin: 'auto',
    padding: '1em',
}
const btnStyle = {
    bgcolor: COLORS.primary.main,
    color: "white",
    mb: "10px",
    border: `1px solid ${COLORS.primary.main}`,
    "&:hover": {
        bgcolor: COLORS.white.main,
        color: "black",
        border: `1px solid ${COLORS.primary.main}`
    }
}