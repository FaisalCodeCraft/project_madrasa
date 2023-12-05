import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox, Divider, Pagination, Stack, } from '@mui/material';
import BasicModal from '../TeacherModal/Modal';
import CustomizedMenus from '../TeacherMenu/Menu';


const DenseTable = (props) => {
    const { tableData } = props

    const itemsPage = 4;

    const [currentPage, setCurrentPage] = React.useState(1);
    const handleChange = (e, value) => {
        setCurrentPage(value);
    };

    const [ids, setIds] = React.useState([])

    const onChecked = (id) => {
        if (ids.includes(id)) {
            const remove = ids.filter((e) => id !== e)
            setIds(remove)
        }
        else {
            setIds([...ids, id])
        }
    }


    const LastItem = currentPage * itemsPage;
    const FirstItem = LastItem - itemsPage;

    return (
        <TableContainer component={Paper} elevation={10}>
            <Table>
                <TableHead>
                    <TableCell className="MuiTableCell-tableHead">Profile</TableCell>
                    <TableCell className="MuiTableCell-tableHead">Roll Number</TableCell>
                    <TableCell className="MuiTableCell-tableHead">F/Name</TableCell>
                    <TableCell className="MuiTableCell-tableHead">Leave</TableCell>
                    <TableCell className="MuiTableCell-tableHead">Reason</TableCell>
                    <TableCell className="MuiTableCell-tableHead"><CustomizedMenus modal={<BasicModal />} /></TableCell>
                </TableHead>
                <TableBody>
                    {tableData.slice(FirstItem, LastItem).map((row) => (
                        <TableRow hover>
                            <TableCell sx={{ display: "flex" }}>
                                <Checkbox checked={ids.includes(row.id)} onChange={() => onChecked(row.id)} />
                                <img src={row.img} alt="UserImage" width={'60px'} height={'60px'}
                                    style={{ borderRadius: '50%' }}
                                />
                            </TableCell>
                            <TableCell>{row.rollNumber}</TableCell>
                            <TableCell>{row.fName}</TableCell>
                            <TableCell>{row.leave}</TableCell>
                            <TableCell>{row.reason}</TableCell>
                            <TableCell><CustomizedMenus modal={<BasicModal />} /></TableCell>

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
    );
}

export default DenseTable;

const pagination = {
    margin: 'auto',
    padding: '1em',
}