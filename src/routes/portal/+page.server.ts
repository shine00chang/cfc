import { redirect, error } from '@sveltejs/kit';
import { auth_student } from '$lib/auth.js';
import { get_class } from '$lib/server/class_op.js';

export async function load ({ cookies }: { cookies: any }) {
  const user = await auth_student(cookies);
  if (!user) throw redirect(303, "../");

  const classes = await Promise.all(user.classes.map(async (id: string) => {
    const class_ = await get_class(id);
    if (!class_) throw error(404, "notfound");
    return {
      name: class_.name,
      id: class_.id
    }
  }))
  return { classes };
}
