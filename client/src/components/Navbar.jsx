import { AppBar, Toolbar, Typography, Box, Button, Tooltip, IconButton, Avatar, Menu, MenuItem, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { assets } from '../assets/assets.js';
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleOpenUserMenu = (event) => {
        setUserMenuAnchor(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setUserMenuAnchor(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "white", color: "black", boxShadow: 1 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>

                {/* Left - Logo */}
                <Link to="/">
                    <img src={assets.logo} alt="Logo" style={{ width: '150px' }} />
                </Link>

                {/* Center - Navigation Links will hide on small screens */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
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
                                borderBottom: "2px solid transparent",
                                "&.active": {
                                    borderBottom: "2px solid #5f6FFF",
                                    fontWeight: "bold",
                                },
                            }}
                        >
                            {path === "/" ? "HOME" : path.slice(1).toUpperCase()}
                        </Button>
                    ))}
                </Box>

                {/* Right - Profile for pc */}
                {isLoggedIn ? (
                    <Box sx={{ display: { md: "flex", xs: 'none' }, alignItems: "center" }}>
                        {/* Profile Avatar */}
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu}>
                                <Avatar alt="Profile Name" src={assets.profile_pic} />
                            </IconButton>
                        </Tooltip>

                        {/* Profile Menu */}
                        <Menu
                            anchorEl={userMenuAnchor}
                            open={Boolean(userMenuAnchor)}
                            onClose={handleCloseUserMenu}
                            sx={{ mt: "45px" }}
                        >
                            {['/my-profile', '/my-appointments'].map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu} component={NavLink} to={setting}>
                                    <Typography sx={{ textAlign: 'center' }}>
                                        {setting.replace("/", "").replace("-", " ").toUpperCase()}
                                    </Typography>
                                </MenuItem>
                            ))}
                            <MenuItem onClick={() => console.log("User logged out")}>
                                <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    <Button
                        component={NavLink}
                        to="/login"
                        variant="contained"
                        sx={{
                            backgroundColor: "#5f6FFF",
                            borderRadius: 10,
                            display: { xs: 'none', md: 'inline-flex' }, // Hide on small screens
                        }}
                    >
                        Log in
                    </Button>
                )}

                {/* Mobile Menu Button */}
                <IconButton
                    sx={{ display: { xs: 'block', md: 'none' } }}
                    onClick={() => setIsDrawerOpen(true)}
                >
                    <Avatar alt="Profile Name" src={assets.profile_pic} />
                </IconButton>

                {/* Mobile Drawer */}
                <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                    <List sx={{ width: "250px" }}>
                        {["/", "/doctors", "/about", "/contact"].map((path, index) => (
                            <ListItem key={index} component={NavLink} to={path}
                                onClick={() => setIsDrawerOpen(false)}
                                sx={{ cursor: 'pointer', textDecoration: 'none', color: 'grey' }}>
                                <ListItemText primary={path === "/" ? "HOME" : path.slice(1).toUpperCase()} />
                            </ListItem>
                        ))}
                        {!isLoggedIn ? (
                            <ListItem component={NavLink} to="/login"
                                onClick={() => setIsDrawerOpen(false)}
                                sx={{ cursor: 'pointer', textDecoration: 'none', color: 'gray' }}>
                                <ListItemText primary="CREATE ACCOUNT" />
                            </ListItem>
                        ) : (
                            <>
                                <ListItem component={NavLink} to="/my-profile"
                                    onClick={() => setIsDrawerOpen(false)}
                                    sx={{ cursor: 'pointer', textDecoration: 'none', color: 'gray' }}>
                                    <ListItemText primary="MY PROFILE" />
                                </ListItem>
                                <ListItem component={NavLink} to="/my-appointments"
                                    onClick={() => setIsDrawerOpen(false)}
                                    sx={{ cursor: 'pointer', textDecoration: 'none', color: 'gray' }}>
                                    <ListItemText primary="MY APPOINTMENTS" />
                                </ListItem>
                                <ListItem onClick={() => console.log("User logged out")}
                                    sx={{ cursor: 'pointer', textDecoration: 'none', color: 'gray' }}>
                                    <ListItemText primary="LOG OUT" />
                                </ListItem>
                            </>
                        )}
                    </List>
                </Drawer>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
