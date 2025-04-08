// import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
// import * as memberService from "../services/memberService.js";
// import {
//   generateAccessToken,
//   generateRefreshToken,
//   verifyRefreshToken,
// } from "../utils/jwtUtils.js";
// import { comparePassword } from "../utils/passwordUtils.js";

// export const login = async (body) => {
//   const { email, password } = body;

//   const member = await memberService.getMemberByEmail(body);
//   if (!member) throw new NotFoundError("Email invalide.");

//   const isPasswordValid = await comparePassword(password, member.password);
//   if (!isPasswordValid) throw new BadRequestError("Mot de passe invalide");

//   const payload = { id: member.member_id, email: email };
//   const accessToken = generateAccessToken(payload);
//   const refreshToken = generateRefreshToken(payload);

//   return {
//     accessToken,
//     refreshToken,
//     member: member,
//   };
// };

// export const refreshTokens = async (token) => {
//   const decoded = verifyRefreshToken(token);

//   const payload = { id: decoded.member_id, email: decoded.email };

//   const newAccessToken = generateAccessToken(payload);
//   const newRefreshToken = generateRefreshToken(payload);

//   return { accessToken: newAccessToken, refreshToken: newRefreshToken };
// };
