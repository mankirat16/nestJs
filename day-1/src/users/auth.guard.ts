import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private jwt: JwtService) {}
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    console.log(req.session, 'Session');
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      req.user = this.jwt.verify(token);
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
