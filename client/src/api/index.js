import axios from "axios";

async function makeApiCall(method, url, data) {
  try {
    const config = {
      method: method.toLowerCase(), // Convert method to lowercase to handle variations
      url,
      headers: {},
    };
    const token = localStorage.getItem("survey");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (method.toLowerCase() === "get" || method.toLowerCase() === "delete") {
      config.params = data;
    } else {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    const { response } = error;
    if (!response) {
      return {
        success: false,
        message: error.message,
      };
    } else {
      return response.data;
    }
  }
}

export const createUser = async (name, email, password, confirmPassword) => {
  return makeApiCall(
    "POST",
    `${process.env.REACT_APP_BASE_URL}admin/register`,
    { name, email, password, confirmPassword }
  );
};

export const login = async (email, password) => {
  return makeApiCall("POST", `${process.env.REACT_APP_BASE_URL}admin/login`, {
    email,
    password,
  });
};

export const submitSurvey = ({
  name,
  gender,
  nationality,
  address,
  email,
  message,
  phoneNumber,
}) => {
  return makeApiCall("POST", `${process.env.REACT_APP_BASE_URL}survey/submit`, {
    name,
    gender,
    nationality,
    address,
    email,
    message,
    phoneNumber,
  });
};
export const getAllSurvey = async () => {
  return makeApiCall("GET", `${process.env.REACT_APP_BASE_URL}admin/allSurvey`);
};

export const deleteSurvey = async (surveyId) => {
  return makeApiCall(
    "DELETE",
    `${process.env.REACT_APP_BASE_URL}admin/remove/${surveyId}`
  );
};
