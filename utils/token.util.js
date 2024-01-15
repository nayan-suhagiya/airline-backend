import jwt from "jsonwebtoken";

const generateAuthToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export default generateAuthToken;
