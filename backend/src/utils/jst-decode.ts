import jwt from "jsonwebtoken";

export const jwtDecoder = (token: string): any => {
  const decoded = jwt.verify(token, "my-secret-key") as { dbUrl: string };

  return decoded.dbUrl;
};
