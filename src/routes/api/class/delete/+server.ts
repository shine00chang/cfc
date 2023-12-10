import { auth_student } from '$lib/auth';
import { delete_class, get_class } from  '$lib/server/class_op.js';

export async function DELETE ({ request, cookies }: { request: any, cookies: any }) {
  let json;
  try {
    json = await request.json()
  } catch (e) {
    return new Response("request body is not JSON", { status: 400 });
  }
  const { classid } = json;
  if (!classid)  
    return new Response("request body missing 'classid'", { status: 400 });

  const user = await auth_student(cookies);
  if (!user) return;

  const class_ = await get_class(classid);
  console.log("got class:", class_);

  if (!class_)
    return new Response(`class with id '${classid}' does not exist`, { status: 400 });

  if (!class_.teachers.includes(user.username))
    return new Response("Only teacher can delete class", { status: 401 });

  await delete_class(classid);
  console.log("deleted class");

  return new Response(`done. deleted '${classid}'`, { status: 201 });
}
