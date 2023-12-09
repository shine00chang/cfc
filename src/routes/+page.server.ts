import { redirect } from '@sveltejs/kit';

export async function load ({ user }: { user: any }) {
  if (user) throw redirect(307, '/portal')
}
