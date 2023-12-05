import React from "react";
import { Box, FormControl, IconButton, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

const Topbar = (props) => {
  const { search, setSearch } = props;

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
            <TextField size="small" type="date" sx={{ width: "200px" }} />
          </FormControl>
        </Box>
      </Box>
      <br />
    </div>
  );
};

export default Topbar;
