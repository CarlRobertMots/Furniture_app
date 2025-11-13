import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = "aVeryLongAndComplexRandomStringThatIsHardToGuess12345";

const generateToken = (userId: string): string => {
  // 🌟 FIX: Change the payload key from 'userId' to 'id'
  return jwt.sign({ id: userId }, JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

export default generateToken;
