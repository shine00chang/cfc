import { redirect } from '@sveltejs/kit';
import { auth_student } from '$lib/auth.js';
import { get_class } from '$lib/server/class_op.js';


export async function load ({ cookies }: { cookies: any }) {
  let user;
  try {
    user = await auth_student(cookies);
  } catch {
    throw redirect(303, "../");
  }
  if (!user) throw redirect(303, "../");

  const classes = user.classes.map(async (id: string) => {
    const class_ = await get_class(id)
    if (!class_) return `notfound`
    return class_.name;
  })
  return { classes };
}
