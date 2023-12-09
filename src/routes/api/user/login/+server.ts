import { get_user } from '$lib/server/user_op.js';
import { validate_passcode } from '$lib/auth.js';

export async function POST ({ request, cookies }: { request: any, cookies: any }) {
  let json;
  try {
    json = await request.json()
  } catch (e) {
    return new Response("request body is not JSON", { status: 400 });
  }
  const { username, password } = json;
  if (!username || !password)  
    return new Response("request body missing 'username' or 'password'", { status: 400 });

  const user = await get_user(username); 
  if (!user) 
    return new Response(`none such user ${username}`, { status: 400 });

  if (!await validate_passcode(user, password)) {
    console.log(`wrong password for '${username}`);
    return new Response(`wrong password for '${username}`, { status: 403 });
  } else {

    // TODO: Sign
    cookies.set("session", username, { path: "/" });
    console.log("logged in user:", { username });

    return new Response(`done. logged in as '${username}'`, { status: 201 });
  }
}
