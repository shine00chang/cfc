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

  if (session == undefined) {
    console.log("unauthorized. no session cookie");
    throw 403;
  }

  // TODO: Might get fucked by signing
  const user = get_user(session);
  if (!user) {
    console.log("CRITICAL ISSUE: session token refers to a nonexistent user");
    throw 400;
  }

  return user;
}

// Make sure the session is a teacher of a class, and return the user. 
export const auth_teacher = async (cookies: any, class_id: string) => {
	const session = cookies.get('session');

  if (session == undefined) {
    console.log("unauthorized. no session cookie");
    throw 403;
  }

  // TODO: Might get fucked by signing
  const user = auth_student(cookies);
  const class_ = get_class(class_id);
  if (!user) throw 403;
  if (!class_) throw 400;

  return user;
}
