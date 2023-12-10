import { auth_student } from '$lib/auth';
import { add_post_submission, add_class } from  '$lib/server/class_op.js';

export async function POST ({ request, cookies }: { request: any, cookies: any }) {
  let json;
  try {
    json = await request.json()
  } catch (e) {
    return new Response("request body is not JSON", { status: 400 });
  }
  const { classname, postid, content } = json;
  if (!classname || !postid || !content)  
    return new Response("request body missing 'classname' or 'postid' or 'content'", { status: 400 });

  const user = await auth_student(cookies);
  if (!user) return;

  const class_ = await add_class(classname);
  console.log("created class:", class_);

  await add_post_submission(class_.id, postid, user, content)
  console.log("added post submission");

  return new Response(`done. posted a submission in '${classname}'`, { status: 201 });
}
