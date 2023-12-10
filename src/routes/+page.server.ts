import { redirect } from '@sveltejs/kit';
import { auth_student } from '$lib/auth.js';

export async function load ({ cookies }: { cookies: any }) {
  const user = await auth_student(cookies);
  if (user) throw redirect(307, '/portal');
}
