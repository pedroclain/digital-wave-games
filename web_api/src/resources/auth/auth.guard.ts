import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from 'src/services/jwt.service';
import { LoggerService } from 'src/services/logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private logger: LoggerService) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const [type, token] = req.headers.authorization?.split(" ") ?? [];
    
    if (type !== "Bearer ") this.logger.warn('Jwt token without "Bearer " prefix');

    if (!token || !this.jwtService.verify(token)) {
      throw new UnauthorizedException("Invalid JWT token");
    }

    return true;
  }
}