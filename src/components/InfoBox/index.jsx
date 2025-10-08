import React, { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { Button, List, ListItem, Menu, Typography } from "@mui/material";

function InfoBox() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button id="info-icon" onClick={handleClick}>
        <InfoIcon sx={{ fontSize: "1.5em" }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <List>
          <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
            T<Typography sx={{ ml: "20px" }}>Alternar video</Typography>
          </ListItem>
          <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
            G/H
            <Typography sx={{ ml: "20px" }}>Cambiar fondo</Typography>
          </ListItem>
          <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
            Esc
            <Typography sx={{ ml: "20px" }}>cerrar menu</Typography>
          </ListItem>
        </List>
      </Menu>
    </>
  );
}

export default InfoBox;
