import { auth_student } from '$lib/auth';
import type { ClassObj } from '$lib/server/class_op.js';
import { get_class } from '$lib/server/class_op.js';
import { error } from '@sveltejs/kit';

export async function load ({ params, request, cookies }: { params: any, request: any, cookies: any }) {
  const classid: string = params.class;
  console.log("cli", classid)

  const user = await auth_student(cookies);
  let class_ = await get_class(classid) as unknown as ClassObj;
  if (!user) throw error(400, `none such user`);
  console.log(user.classes, classid)
  if (!user.classes.includes(classid)) throw error(401, `You are not in this class broh`)
  if (!class_) throw error(400, `none such class ${classid}, maybe it was delet`);
  //only teachers can see submissions
  if (!class_.teachers.includes(user.username)) throw error(401, "only teachers can make posts");
  return {
    class_,
    user,
  };
}
