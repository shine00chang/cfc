export const fetchPost = async (path: string, body: any) => { 
  return await fetch(path, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
