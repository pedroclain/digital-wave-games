import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private TIME_LIMIT = 60 * 20; // 20 minutes
  
  generateAccessToken(payload: Payload) {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: this.TIME_LIMIT, 
      },
    );
  }

  verify(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
      return false;
    }
  }
}

type Payload = {
  username: string;
  imgUrl: string;
};
