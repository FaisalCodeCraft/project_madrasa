import React from "react";
import { Box, FormControl, IconButton, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { getAttendance } from "services/stdTeacher";
import { useAuthContext } from "context/authContext";

const Topbar = (props) => {
  const { search, setSearch, setTableData } = props;
  const context = useAuthContext()

  const getDate = async (e) => {
    const id = new Date(e).toLocaleDateString().replaceAll("/", "-");
    context?.setOldDate(id)
    await getAttendance(id, setTableData, context?.user?.classAssign)
  }


  return (
    <div>
      <Box
        display={{ md: "flex", xs: "block" }}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <TextField
            size="small"
            InputProps={{
              startAdornment: (
                <IconButton>
                  <Search />
                </IconButton>
              ),
            }}
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            placeholder="Search Student"
            type="search"
            sx={{ width: "200px" }}
          />
        </Box>
        <Box>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <TextField size="small" type="date" sx={{ width: "200px" }}
              onChange={(e) => getDate(e.target.value)}
            />

          </FormControl>
        </Box>
      </Box>
      <br />
    </div>
  );
};

export default Topbar;
