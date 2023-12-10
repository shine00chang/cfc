import { auth_student } from '$lib/auth';
import type { ClassObj } from '$lib/server/class_op.js';
import { get_class } from '$lib/server/class_op.js';
import { error } from '@sveltejs/kit';

export const ssr = false;

export async function load ({ params, url, cookies }: { params: any, url: any, cookies: any }) {
  const classid: string = params.class;
  console.log("cli", classid)

  const user = await auth_student(cookies);
  let class_ = await get_class(classid) as unknown as ClassObj;
  if (!user) throw error(400, `none such user`);
  if (!class_) throw error(400, `none such class '${classid}'`);
  if (!user.classes.includes(classid)) throw error(401, `You are not in the class ${classid}: ${class_.name}`)
  //only teachers can see submissions
  if (!class_.teachers.includes(user.username)) {
    class_.posts = class_.posts.map((p) => {p.submissions = []; return p});
  }
  return {
    class_,
    user,
    pathname: url.pathname,
  };
}
