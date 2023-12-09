import { auth_student } from '$lib/auth';
import { add_class } from  '$lib/server/class_op.js';
import { add_user_to_class } from '$lib/server/user_op';

export async function POST ({ request, cookies }: { request: any, cookies: any }) {
  let json;
  try {
    json = await request.json()
  } catch (e) {
    return new Response("request body is not JSON", { status: 400 });
  }
  const { classname } = json;
  if (!classname)  
    return new Response("request body missing 'classname'", { status: 400 });

  const user = await auth_student(cookies);
  if (!user) return;

  const class_ = await add_class(classname);
  console.log("created class:", class_);

  await add_user_to_class(user.name, class_.id)
  console.log("added self to class");

  return new Response(`done. joined '${classname}'`, { status: 201 });
}
