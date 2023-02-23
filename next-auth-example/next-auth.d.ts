// import "next-auth/jwt"

// // Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

// declare module "next-auth/jwt" {
//   interface JWT {
//     /** The user's role. */
//     userRole?: "admin"
//   }
// }


import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}