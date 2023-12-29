import Survey from "../models/Survey.js";

export const createSurvey = async (req, res) => {
  try {
    await Survey.create(req.body);

    res.status(201).json({ success: true, message: "survey created" });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
