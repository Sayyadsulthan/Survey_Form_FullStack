import React, { useEffect, useState } from "react";
import { getAllSurvey, deleteSurvey } from "../../api";
import { Box, useMediaQuery } from "@mui/material";
import SurveyCard from "../../components/SurveyCard";
import { toast } from "react-toastify";
import { useAuth } from "../../hook";

const Admin = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const isNonMobile = useMediaQuery("(min-width:768px)");
  const isSmallMobile = useMediaQuery("(max-width:480px)");
  const auth = useAuth();

  useEffect(() => {
    setLoading(true);
    const handleGetAllSurveys = async () => {
      const response = await getAllSurvey();
      if (response.success) {
        if (response.data) {
          setSurveys([...response.data]);
        }
      } else {
        toast.error(response.message);
        setSurveys([]);
      }
      setLoading(false);
    };

    handleGetAllSurveys();
  }, []);

  const handleRemove = async (index) => {
    const data = surveys;
    // finding the id from data[{}]
    const id = data[index]._id;
    // make Api call to remove
    const response = await deleteSurvey(id);
    //if success
    if (response.success) {
      // filtering the array by removing the object
      const updatedSurvey = data.filter((value, i) => index !== i);
      toast.success(response.message);
      setSurveys([...updatedSurvey]);
    } else {
      toast.error(response.message);
    }
  };

  if (auth.loading || loading) {
    return <h2>Loading....</h2>;
  }

  return (
    <Box
      bgcolor={"rgb(243, 246, 249)"}
      minHeight="100vh"
      mt="-20px"
      width={"100%"}
    >
      <h1>Admin Page</h1>

      <Box
        display="grid"
        gridTemplateColumns="repeat(6, 1fr)"
        sx={{
          "&> div": {
            gridColumn: isNonMobile
              ? undefined
              : isSmallMobile
              ? "span 6"
              : "span 3",
            padding: "10px 20px",
          },
        }}
        gap={"20px"}
      >
        {surveys.length > 0 &&
          surveys.map((data, i) => (
            <SurveyCard data={data} key={i} index={i} remove={handleRemove} />
          ))}
      </Box>
    </Box>
  );
};

export default Admin;
