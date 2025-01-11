import JwtHelper from "../helper/jwt"
import { bearerAuth } from "hono/bearer-auth";



class AuthMiddleware {
  private jwtHelper: JwtHelper;

  constructor() {
    this.jwtHelper = new JwtHelper();
  }

  authenticate = bearerAuth({
    verifyToken: async (token, c) => {
      try {
        console.log("Authention started");
        if (!token) {
          c.status(401);

          c.text("Access Denied. No token available!");
          return false;
        }
        console.log("token", token);

        const decoded = this.jwtHelper.decode(token);
        console.log("decoded", decoded);
        if (!decoded) {
          c.status(401);

          c.text("Access Denied. Invalid token!");
          return false;
        }

        const verified = await this.jwtHelper.verify(token);
        console.log("verified", verified)
        if (!verified) {
          c.status(401);

          c.text("Access Denied. Invalid token")
          return false;
        }
        console.log()
        console.log()
        console.log()
        c.set("user", verified.user);

        return true;
      } catch (error: any) {
        console.log(error)
        c.status(500);
        c.text(error.message);
        return false;
      }
    }
  })
}

export default AuthMiddleware;