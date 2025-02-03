import { registerAs } from "@nestjs/config";

export default registerAs("config", () => ({
  database: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "1d",
  },
  security: {
    bcryptSaltRounds: 10,
    allowedOrigins: process.env.ALLOWED_ORIGINS,
  },
}));
