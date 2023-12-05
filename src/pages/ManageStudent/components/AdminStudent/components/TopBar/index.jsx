import { SearchOutlined } from "@mui/icons-material";
import { Box, IconButton, MenuItem, TextField } from "@mui/material";
import { FILTER_BY_CLASS } from "constant/content";
import React from "react";

const TopBar = (props) => {
  const { search, setSearch } = props;

  return (
    <React.Fragment>
      <div style={{ marginBottom: "25px" }}>
        <Box display={{md:"flex"}}>
          <Box display={"flex"} justifyContent={{md:"center"}} alignItems={"center"}>
            <TextField
              size="small"
              sx={{ width: {md:200,xs:"100%"} }}
              id="outlined-search"
              placeholder="Search"
              type="search"
             
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <SearchOutlined />
                  </IconButton>
                ),
              }}
              value={search}
              onChange={({ target }) => setSearch(target.value)}
            />
          </Box>
          <TextField
            size="small"
              sx={{ mx: {md:3},mt:{md:0,xs:2}, width: {md:200,xs:"100%"}}}
            select
            defaultValue={"Class 1st"}
          >
            {FILTER_BY_CLASS.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </div>
    </React.Fragment>
  );
};

export default TopBar;
