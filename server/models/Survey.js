import mongoose from "mongoose";

const surveySchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  nationality: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: String,
  message: String,
});

const Survey = mongoose.model("Survey", surveySchema);

export default Survey;
