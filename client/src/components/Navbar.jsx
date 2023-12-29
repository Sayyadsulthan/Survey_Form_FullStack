import {
  Avatar,
  Box,
  Button,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { useAuth } from "../hook";
import { Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  const handleLogout = (e) => {
    e.preventDefault();
    auth.logout();
  };
  return (
    <Box width={"100%"}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="black"
        sx={{
          color: "whitesmoke",
          height: "100px",
        }}
        mb={"1rem"}
        width={"100%"}
      >
        <Box
          width={isNonMobile ? "400px" : "200px"}
          display="flex"
          justifyContent={"flex-start"}
          padding={"0px 10px"}
          alignItems="center"
          columnGap={"20px"}
          sx={{ color: "white" }}
        >
          {isNonMobile && (
            <Avatar
              sx={{
                backgroundColor: "white",
                width: "60px",
                height: "60px",
              }}
            >
              <Person2OutlinedIcon sx={{ color: "black", width: "100%" }} />
            </Avatar>
          )}

          <Typography variant="h4">Survey Form</Typography>
        </Box>

        <Box
          width="100px"
          height="60px"
          display="flex"
          justifyContent="space-between"
        >
          {auth.user ? (
            <Button variant="contained">
              {" "}
              <Link underline="hover" color="white" onClick={handleLogout}>
                {" "}
                Logout
              </Link>
            </Button>
          ) : (
            <Button variant="contained" onClick={() => navigate("/login")}>
              {" "}
              <Link underline="hover" color="white">
                {" "}
                Sign In
              </Link>
            </Button>
          )}
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
};

export default Navbar;
