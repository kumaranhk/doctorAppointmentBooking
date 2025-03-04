import { AppBar, Toolbar, Typography, Box, Button, Tooltip, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { assets } from '../assets/assets.js'
import { useState } from "react";

const Navbar = () => {
    const [userMenu, setUserMenu] = useState(false);
    const[isLoggedIn,setIsLoggedIn] = useState(true);
    const handleOpenUserMenu = () => {
        setUserMenu(true);
    }
    const handleCloseUserMenu = () => {
        setUserMenu(false);
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: "white", color: "black", boxShadow: 1 }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>

                {/* Logo on the left */}
                <Link to={'/'}>
                    <img src={assets.logo} style={{ width: '200px' }} />
                </Link>

                {/* Centered Navigation Links */}
                <Box sx={{ display: "flex", gap: 3 }}>
                    {["/", "/doctors", "/about", "/contact"].map((path, index) => (
                        <Button
                            key={index}
                            component={NavLink}
                            to={path}
                            variant="text"
                            sx={{
                                color: "black",
                                textTransform: "none",
                                fontSize: '15px',
                                padding: 0,
                                borderRadius: 0,
                                borderBottom: () => `2px solid transparent`,
                                "&.active": {
                                    borderBottom: `2px solid #5f6FFF`,
                                },
                            }}
                        >
                            {path === "/" ? "HOME" : path.slice(1).toUpperCase()}
                        </Button>
                    ))}
                </Box>

                {/* Right-side button */}
                {isLoggedIn ? <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings" arrow>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt='profile_name' src={assets.profile_pic} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={userMenu}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(userMenu)}
                        onClose={handleCloseUserMenu}
                    >
                        {['/my-profile', '/my-appointments'].map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu} component={NavLink} to={setting}>
                                <Typography sx={{ textAlign: 'center' }}>{setting.slice(1).charAt(0).toUpperCase() + setting.slice(2)}</Typography>
                            </MenuItem>
                        ))}
                        <MenuItem onClick={() => console.log("user logged out")} ><Typography sx={{textAlign : 'center'}}>Logout</Typography></MenuItem>
                    </Menu>
                </Box> :
                    <Button
                        component={NavLink}
                        to="/login"
                        variant="contained"
                        sx={{ backgroundColor: "#5f6FFF", borderRadius: 10 }}
                    >
                        Create Account
                    </Button>}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
