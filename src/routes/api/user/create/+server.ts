export async function POST ({ request }: { request: any }) {
  let json;
  try {
    json = await request.json()
  } catch (e) {
    return new Response("request body is not JSON", { status: 400 });
  }
  const { username, password } = json;
  if (!username && !password)  
    return new Response("request body missing 'username' or 'password'", { status: 400 });

  // TODO: add to user collection
  console.log("created user:", { username, password });

  return new Response(`done. created '${username}'`, { status: 201 });
}
