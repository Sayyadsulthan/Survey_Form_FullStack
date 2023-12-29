import React, { useState } from "react";
import styled from "./index.module.css";
import { submitSurvey } from "../../api";
import { toast } from "react-toastify";

const Survey = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isResponseSent, setIsResponseSent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    nationality: "",
    email: "",
    phoneNumber: "",
    address: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      gender: "",
      nationality: "",
      email: "",
      phoneNumber: "",
      address: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    // making api call to submit surway
    const response = await submitSurvey(formData);
    // reset the form input
    handleReset();
    if (response.success) {
      setIsResponseSent(true);
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  return (
    <div className={styled.container}>
      <h1>Survey Form</h1>

      {isResponseSent ? (
        <div className="res-sent">
          <h3>Response Submitted</h3>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label>
            Nationality:
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Phone Number:
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Address:
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </label>

          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </label>

          <button type="submit" disabled={isLoading}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Survey;
