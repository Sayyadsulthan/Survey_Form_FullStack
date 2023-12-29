import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Link,
  Avatar,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3) {
      setMessage("name have minimun 3 characters");
      handleClearMessage();
      return;
    }

    if (password.length < 5) {
      setMessage("password atleast size of 5");
      handleClearMessage();
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Password and ConfirmPassword not Match!!");
      handleClearMessage();
      return;
    }

    const response = auth.signup(name, email, password, confirmPassword);
    if (response.success) {
      toast.success("Regestraion Successfull..");
      return navigate("/login");
    } else {
      toast.error(response.message);
    }
    handleClearInput();
  };

  const handleClearInput = () => {
    setEmail("");
    setName("");
    setPassword("");
    setConfirmPassword("");
  };
  const handleClearMessage = () => {
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  if (auth.user) {
    return navigate("/admin");
  }

  return (
    <Box display="flex" gap="10px" justifyContent="center" alignItems="center">
      <Paper
        elevation={10}
        style={{
          width: "600px",
          minHeight: "500px",
          textAlign: "center",
          margin: "1.5rem 0",
          padding: "1.5rem 0",
          borderRadius: "2rem",
        }}
      >
        <Box display="flex" justifyContent="center">
          <Avatar sx={{ backgroundColor: "#3b3939" }}>
            {/* Icon need to add */}
            <AccountCircleOutlinedIcon />
          </Avatar>
        </Box>
        <Box>
          <Typography variant="h2"> Sign Up </Typography>
        </Box>
        <form method="post" onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            width="80%"
            margin="1rem auto"
            rowGap="1rem"
          >
            <TextField
              onChange={(e) => setName(e.target.value)}
              label="Name"
              placeholder="letters minimun 4"
              required
            />
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="abc@xyz.com"
              required
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              type="password"
              placeholder="minimun 4 length"
              required
            />
            <TextField
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="ConfirmPassword"
              type="password"
              placeholder=" same as password"
              required
            />

            <Button variant="contained" type="submit">
              Sign Up
            </Button>

            <Typography variant="h6" color={"red"}>
              {" "}
              {message && `* ${message}`}
            </Typography>
          </Box>
        </form>

        <Box>
          <Typography variant="h5">
            Have an Account? :{" "}
            <Link underline="hover" onClick={() => navigate("/login")}>
              {" "}
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;
