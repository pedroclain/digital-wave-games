import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  decode(accessToken: string) {
      if (accessToken) return jwtDecode<PayloadType>(accessToken)

      return null;
  }
}

export type PayloadType = {
  username: string
  imgUrl: string
}
