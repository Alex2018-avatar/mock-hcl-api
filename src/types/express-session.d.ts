import "express-session";

declare module "express-session" {
  interface SessionData {
    userAuth?: {
      userId: string;
      // Puedes extender con lo que quieras: email, roles, etc.
    };
    cart?: {
      [key: string]: string | number | boolean | object | Array<any>;
    };
  }
}
