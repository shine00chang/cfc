import { auth_student } from '$lib/auth';
import { get_class } from  '$lib/server/class_op.js';
import { remove_user_from_class, get_user } from  '$lib/server/user_op.js';

export async function DELETE ({ request, cookies }: { request: any, cookies: any }) {
  let json;
  try {
    json = await request.json()
  } catch (e) {
    return new Response("request body is not JSON", { status: 400 });
  }
  //username is student to remove, remove_self is boolean to allow removing self or not (should usually be false)
  const { classid, username, remove_self } = json;
  if (!classid)
    return new Response("request body missing 'classid'", { status: 400 });
  if (!username)
    return new Response("request body missing 'username'", { status: 400 });

  const user = await auth_student(cookies);
  if (!user) return;

  //dont allow teachers to remove themselves
  if (user.username === username && !remove_self)
    return new Response("cannot remove self from class if remove_self is false", { status: 400 });

  const remove_user = await get_user(username);
  if (!remove_user) return;

  const class_ = await get_class(classid);
  console.log("got class:", class_);

  if (!class_)
    return new Response(`class with id '${classid}' does not exist`, { status: 400 });

  if (!class_.teachers.includes(user.username))
    return new Response("Only teacher can remove students", { status: 401 });

  await remove_user_from_class(username, classid);
  console.log(`removed ${remove_user_from_class} from class`);

  return new Response(`done. removed '${username}' from '${classid}'`, { status: 201 });
}
