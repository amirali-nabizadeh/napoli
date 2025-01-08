import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/authentication/model/user/user.entity';

export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }

  async comparePassword(password, hashPass) {
    return bcrypt.compare(password, hashPass);
  }

  generateJwt(user: User) {
    return this.jwtService.signAsync({ user });
  }
}
