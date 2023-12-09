import { redirect } from '@sveltejs/kit';
import { auth_student } from '$lib/auth.js';


export async function load ({ cookies }: { cookies: any }) {
  let user;
  try {
    user = await auth_student(cookies);
  } catch {
    throw redirect(303, "/");
  }
  console.log(user);
  //if (user) throw redirect(300, "/portal");
  return;
}