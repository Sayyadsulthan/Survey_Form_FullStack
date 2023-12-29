import React, { useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const SurveyCard = ({ data, remove, index }) => {
  const field = [
    "name",
    "email",
    "gender",
    "nationality",
    "phoneNumber",
    "address",
    "message",
  ];
  return (
    <Paper elevation={10} >
      <Box position="relative" top="-2%" left="95%" >
        <HighlightOffOutlinedIcon sx={{ height: "30px" }} onClick={()=>remove(index)} />
      </Box>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          top: "-20px",
          wordWrap:"break-word"
        }}
      >
        {field.map((value, i) => (
          <ListItem key={i}>
            <ListItemText
              elevation={10}
              primary={`${value} :`}
              secondary={
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {data[value]}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SurveyCard;
