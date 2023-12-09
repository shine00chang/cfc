import { verify } from "argon2";

export const validate_passcode = async (user: any, password: string) => {
  // TODO: Salting & hashing & shit
  return await verify(user.password, password);
}
