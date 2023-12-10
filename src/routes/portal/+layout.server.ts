import { redirect } from '@sveltejs/kit';
import { auth_student } from '$lib/auth.js';

export async function load (request: any) {
  /*
  request.user = await auth_student(request.cookies);
  if (!request.user) { 
    console.log('redirecting');
    throw redirect(307, "/");
  }
  */
  request.user = {
    name: "bhargav",
    username: "bde",
  }

  return { user: request.user };
}
