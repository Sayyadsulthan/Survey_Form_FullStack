import React, { useEffect, useState } from "react";
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

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth.user) {
      return navigate("/admin");
    }
  }, [auth.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await auth.login(email, password);

    if (response.success) {
      toast.success("Login success");
      setEmail("");
      setPassword("");
    } else {
      toast.error(response.message);
    }
  };

  if (auth.user) {
    return navigate("/admin");
  }

  if (auth.loading) {
    return "Loading....";
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
          <Typography variant="h2"> Sign In </Typography>
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
              label="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button variant="contained" type="submit">
              Sign In
            </Button>
          </Box>
        </form>

        <Box>
          <Typography variant="h5">
            Don't have an Account? :{" "}
            <Link underline="hover" onClick={() => navigate("/signup")}>
              {" "}
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
