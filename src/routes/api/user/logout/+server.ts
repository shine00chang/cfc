export async function POST ({ cookies } : { cookies: any }) {
  cookies.delete("session", { path: "/" });
  console.log("deleted 'session' cookie");
  return new Response("logged out", { status: 200 });
}
