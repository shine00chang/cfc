import { redirect } from '@sveltejs/kit';
import { auth_student } from '$lib/auth.js';

export async function load (request: any) {
  request.user = await auth_student(request.cookies);
  if (!request.user) throw redirect(300, "/");
}
