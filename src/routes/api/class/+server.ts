import { auth_student } from '$lib/auth';
import { get_class } from '$lib/server/class_op';

export async function GET ({ params, request, cookies }: { params: any, request: any, cookies: any }) {
  let json;
  try {
    json = await request.json()
  } catch (e) {
    return new Response("request body is not JSON", { status: 400 });
  }
  const { classid } = json;
  console.log("cli", classid)
  if (!classid)  
    return new Response("request body missing 'classid'", { status: 400 });

  const user = await auth_student(cookies);
  const class_ = await get_class(classid);
  if (!user) return new Response(`none such user`, { status: 400 });
  if (!user.classes.includes(classid)) return new Response(`You are not in this class bro`, { status: 401 })
  if (!class_) return new Response(`none such class ${classid}`, { status: 400 });

  return new Response(JSON.stringify(class_), { status: 201, headers: { 'Content-Type': 'application/json' } });
}
