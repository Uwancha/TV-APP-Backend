import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define a custom interface that extends express Request
export interface CustomRequest extends Request {
    user?: JwtPayload | User | undefined;
};

interface User {
    role: string
};

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    // Verify token using JWT secret
    // Will throw error if token is not verified
    const jwtSecret = process.env.JWTSECRET as string;
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload | User | undefined;

    // Attach decoded user information to request object
    req.user = decoded;

    // Call next middleware
    return next();
} catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
        // Token is invalid or malformed
        return res.status(403).json({ message: "Invalid token" });
    } else if (error instanceof jwt.TokenExpiredError) {
        // Token has expired
        return res.status(403).json({ message: "Token has expired" });
    } else {
        // Other errors
        return res.status(500).json({ message: "Internal server error" });
    }
};
};

export const authorizeAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') return res.sendStatus(403);
  next();
};
