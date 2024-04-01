import { HttpException, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';

export const handleErrors = (message: string, code: number) => {
  const logger = new Logger();
  logger.error(message);

  throw new HttpException(message, code);
};

export const convertToken = (context: any) => {
  const authHeader = context.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');
  const decodedToken: any = jwt.verify(token, 'ssandkbafdheiwe5234@$#56666');
  return decodedToken.sub;
};

export const PasswordHash = () => {
  async function hashPassword (password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  }
  
  async function isPasswordsEqual (
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }

  return {hashPassword, isPasswordsEqual}
}

