// src/types/request.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface User {
      _id: string;
      role: string;
      // Add other properties of the user as needed
    }

    interface Request {
      user: User;
    }
  }
}
