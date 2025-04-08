// import jwt from "jsonwebtoken";

// const ACCESS_SECRET_KEY = process.env.JWT_SECRET;
// const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET;

// const ACCESS_TOKEN_EXPIRES_IN = "1h";
// const REFRESH_TOKEN_EXPIRES_IN = "7d";

// export const generateToken = (payload, secret, expiresIn) => {
//   return jwt.sign(payload, secret, { expiresIn, algorithm: "HS256" });
// };

// export const generateAccessToken = (payload) => {
//   return generateToken(payload, ACCESS_SECRET_KEY, ACCESS_TOKEN_EXPIRES_IN);
// };

// export const generateRefreshToken = (payload) => {
//   return generateToken(payload, REFRESH_SECRET_KEY, REFRESH_TOKEN_EXPIRES_IN);
// };

// export const verifyAccessToken = (token) => {
//   return jwt.verify(token, ACCESS_SECRET_KEY);
// };

// export const verifyRefreshToken = (token) => {
//   return jwt.verify(token, REFRESH_SECRET_KEY);
// };
