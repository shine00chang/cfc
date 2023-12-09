import { verify } from "argon2";
import {get_class} from "./server/class_op";
import { get_user } from "./server/user_op";

export const validate_passcode = async (user: any, password: string) => {
  // TODO: Salting & hashing & shit
  return await verify(user.password, password);
}

// Make sure the session is a student, and return the user. 
export const auth_student = async (cookies: any) => {
	const session = cookies.get('session');
  if (!session) return undefined;

  // TODO: Might get fucked by signing
  const user = get_user(session);
  if (!user) console.log("CRITICAL ISSUE: session token refers to a nonexistent user");

  return user;
}

// Make sure the session is a teacher of a class, and return the user. 
export const auth_teacher = async (cookies: any, class_id: string) => {
  // TODO: Might get fucked by signing
  const user = auth_student(cookies);
  const class_ = get_class(class_id);
  if (!user) return undefined;
  if (!class_) return undefined;

  return user;
}
