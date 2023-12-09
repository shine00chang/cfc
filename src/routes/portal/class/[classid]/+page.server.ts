import { redirect } from '@sveltejs/kit';
import { get_class } from '$lib/server/class_op';

export async function load ({ user, params }: { user: any, cookies: any, params: any }) {
  console.log('params: ', params);
  const { classid } = params;
  if (!user.classes.has(classid)) {
    console.log(`${user.name} attempted to access class ${classid} that they are not in`);
    throw redirect(300, '/');
  }
  const class_ = get_class(classid);
  return { class_ };
}
