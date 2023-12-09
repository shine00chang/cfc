import { auth_student } from '$lib/auth';
import { get_class } from '$lib/server/class_op';
import { add_user_to_class } from '$lib/server/user_op';

export async function POST ({ request, cookies }: { request: any, cookies: any }) {
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
  const class_ = await get_class(classid);
  if (!user) return new Response(`none such user`, { status: 400 });
  if (!class_) return new Response(`none such class ${classid}`, { status: 400 });

  await add_user_to_class(user.username, class_.id)
  console.log("added self to class");

  return new Response(`done. joined '${class_.name}'`, { status: 201 });
}
