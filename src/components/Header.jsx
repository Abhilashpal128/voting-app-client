import React, { useEffect, useState } from "react";
import { getDataFromLocalStorage } from "../helper/helper";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import { ImProfile } from "react-icons/im";

function Header() {
  const [user, setUser] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const data = getDataFromLocalStorage();
    setUser(data);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);

  return (
    <div>
      <div className="md:px-[70px] w-full  h-[70px] flex items-center justify-between  bg-gradient-to-r from-white to-zinc-800 ">
        <div>
          <h1 className="text-xl font-bold">Voting App</h1>
        </div>
        <div>
          <div>
            {user && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <span>
                  <Avatar className="bg-white  ">
                    <span className="flex ">
                      <h1 className="capitalize">
                        {" "}
                        {user?.username?.charAt(0)}
                      </h1>
                    </span>
                  </Avatar>
                </span>
              </IconButton>
            )}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <div className=" bg-white border-black text-black font-semibold text-xl rounded-lg  flex justify-center items-center">
                <span className="text-sm"></span>
                <MenuItem onClick={handleClose}>
                  {" "}
                  <ImProfile className="pr-2 text-xl" />
                  {user?.username}
                </MenuItem>
              </div>
              <MenuItem onClick={handleOpen}>
                <Logout />
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
