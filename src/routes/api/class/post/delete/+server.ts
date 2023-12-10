import { auth_student } from '$lib/auth';
import { delete_post, get_class } from  '$lib/server/class_op.js';

export async function DELETE ({ request, cookies }: { request: any, cookies: any }) {
  let json;
  try {
    json = await request.json()
  } catch (e) {
    return new Response("request body is not JSON", { status: 400 });
  }
  const { classid, postid } = json;
  if (!classid)  
    return new Response("request body missing 'classid'", { status: 400 });
  if (!classid)  
    return new Response("request body missing 'postid'", { status: 400 });

  const user = await auth_student(cookies);
  if (!user) return;

  const class_ = await get_class(classid);
  console.log("got class:", class_);

  if (!class_)
    return new Response(`class with id '${classid}' does not exist`, { status: 400 })

  if (!class_.teachers.includes(user.username))
    return new Response("Only teacher can delete post", { status: 401 });

  let a = await delete_post(classid, postid);
  console.log("deleted post", a);

  return new Response(`done. deleted post '${postid}' in '${classid}'`, { status: 201 });
}
