import { add_user, get_user } from  '$lib/server/user_op.js';

export async function POST ({ request }: { request: any }) {
  let json;
  try {
    json = await request.json()
  } catch (e) {
    return new Response("request body is not JSON", { status: 400 });
  }
  const { username, name, password } = json;
  if (!username || !name || !password)  
    return new Response("request body missing 'username', 'name' or 'password'", { status: 400 });

  if (await get_user(username)) 
    return new Response(`a user already exists with username '${username}'`, { status: 400 });

  await add_user(username, name, password);
  console.log("created user:", { username, name });

  return new Response(`done. created '${username}'`, { status: 201 });
}
