import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GenHashUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //console.log(req.body); // Log the original URL of the incoming request
    if (req.body && req.body.hash_password) {
      const saltRounds = 10; // Number of salt rounds for bcrypt
      const hashedPassword = bcrypt.hashSync(req.body.hash_password, saltRounds);
      req.body.hash_password = hashedPassword; // Replace the original password with the hashed version
    }
    next();
  }
}
