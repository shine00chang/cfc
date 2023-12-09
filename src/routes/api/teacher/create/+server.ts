import { add_class } from  '$lib/server/class_op.js';

export async function POST ({ request }: { request: any }) {
  let json;
  try {
    json = await request.json()
  } catch (e) {
    return new Response("request body is not JSON", { status: 400 });
  }
  const { classname } = json;
  if (!classname)  
    return new Response("request body missing 'classname'", { status: 400 });

  await add_class(classname);
  console.log("created class:", classname);

  return new Response(`done. created '${classname}'`, { status: 201 });
}
