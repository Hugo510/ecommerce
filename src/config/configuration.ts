import { registerAs } from "@nestjs/config";

export default registerAs("config", () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "1d",
  },
  security: {
    bcryptSaltRounds: 10,
    allowedOrigins: process.env.ALLOWED_ORIGINS, // Ej.: "https://miapp.com,https://otro.com"
  },
}));
