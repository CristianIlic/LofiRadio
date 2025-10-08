import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";
import { useAuthStore } from "../../utils/store";
import supabase from "../../api/supabase";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

function ProfileButton() {
  const navigate = useNavigate();
  const { clearData, userData } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    const { error } = supabase.auth.signOut();
    if (error) throw error;
    clearData();
    navigate("/");
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path
            fill-rule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          />
        </svg> */}
        <PermIdentityIcon />
        {userData && userData.nickname}
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
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/profile");
          }}
        >
          Editar Perfil
        </MenuItem>
        <MenuItem onClick={handleClose}>Mis favoritos</MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleSignOut();
          }}
        >
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  );
}

export default ProfileButton;
