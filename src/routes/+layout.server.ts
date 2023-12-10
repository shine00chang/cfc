import { auth_student } from '$lib/auth.js';

export async function load (request: any) {
  request.user = await auth_student(request.cookies);
  console.log('loaded user');

  return { user: request.user };
}
