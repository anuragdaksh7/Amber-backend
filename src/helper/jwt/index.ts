import type { Context } from 'hono';
import { decode, sign, verify } from 'hono/jwt'

import ENV_CONFIG from "../../config/env.config";

type UserSignData = {
  id: string;
};

interface IJwtHeleper {
  generateAccessToken: (user: UserSignData) => Promise<string>;
  generateRefreshToken: (user: UserSignData) => Promise<string>;
  verify: (token: string) => any;
  decode: (token: string) => any;
  // extractToken: (req: Request) => any;
}

class JwtHelper implements IJwtHeleper {
  generateAccessToken = async (user: UserSignData) => {
    const token = await sign(
      user,
      ENV_CONFIG.JWT_SECRET,
    )
    
    return token;
  };

  generateRefreshToken = async (user: UserSignData) => {
    const token = await sign(
      user,
      ENV_CONFIG.JWT_SECRET
    )

    return token;
  };

  verify = async (token: string) => {
    console.log('verify token', token);
    const result = await verify(
      token,
      ENV_CONFIG.JWT_SECRET
    )

    return result;
  };

  decode = (token: string) => {
    return decode(token);
  };

  // extractToken = (c: Context) => {
  //   // const token = req.headers.authorization || req.headers["x-access-token"];
  //   const token = c.header('Authorization');
  //   // @ts-ignore
  //   return token ? token.split(" ")[1] : null;
  // };
}

export default JwtHelper;
