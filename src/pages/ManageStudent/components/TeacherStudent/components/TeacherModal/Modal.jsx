import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material';


export default function BasicModal() {
    const [open, setOpen] = React.useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
 
    return (
        <div>
            <Typography onClick={handleOpen}>Leave</Typography>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography>Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Animi dignissimos vero molestiae
                        consequuntur pariatur, distinctio eveniet voluptatum
                        repudiandae accusamus, aut hic ab incidunt dolorem est
                        dolore facere consectetur odio eos?</Typography>
                    <form >
                        <TextField
                            required
                            type='text'
                            placeholder='Reason'
                            fullWidth
                        >
                        </TextField>
                        <br />
                        <br />
                        <FormControl fullWidth>
                            <Select
                                required
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={10}>Half Day</MenuItem>
                                <MenuItem value={20}>Full Day</MenuItem>
                            </Select>
                        </FormControl>
                        <Box display={'flex'} m={1} gap={4}>
                            <Button
                                fullWidth
                                type='button'
                                onClick={handleClose}
                                variant='secondary'
                                color='secondary'
                            >Cancel</Button>
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                            >Submit</Button>

                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 25,
    borderRadius: '10px',
    p: 4,
};
