import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {

  hashPassword(pass: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, salt)
  }

  comparePassword(pass: string, storeHashPassword: string): Promise<boolean> {
    return bcrypt.compare(pass, storeHashPassword)
  }
}
