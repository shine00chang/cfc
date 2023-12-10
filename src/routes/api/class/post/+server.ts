import { auth_student } from '$lib/auth';
import { add_post, get_class } from  '$lib/server/class_op.js';
import { get_user } from  '$lib/server/user_op.js';

export async function DELETE ({ request, cookies }: { request: any, cookies: any }) {
  let json;
  try {
    json = await request.json()
  } catch (e) {
    return new Response("request body is not JSON", { status: 400 });
  }
  //username is student to remove, remove_self is boolean to allow removing self or not (should usually be false)
  const { classid, username, title, type, content } = json;
  if (!classid || !username || !title || !type || !content)
    return new Response("request body missing a required field", { status: 400 });

  const user = await auth_student(cookies);
  if (!user) return;

  const remove_user = await get_user(username);
  if (!remove_user) return;

  const class_ = await get_class(classid);
  console.log("got class:", class_);

  if (!class_)
    return new Response(`class with id '${classid}' does not exist`, { status: 400 });

  if (!class_.teachers.includes(user.username))
    return new Response("Only teacher can make post", { status: 401 });

  let p = await add_post(classid, title, user, type, content);
  console.log("posted post", p);

  return new Response(`done. added post`, { status: 201 });
}
