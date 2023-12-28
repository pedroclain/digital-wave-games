import { Injectable, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private TIME_LIMIT = 60 * 60 * 24; // 1 day
  
  generateAccessToken(payload: Payload) {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: this.TIME_LIMIT,
      },
    );
  }
}

type Payload = {
  username: string;
  imgUrl: string;
};
