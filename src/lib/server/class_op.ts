import db from "./db.js";
import { gen_id } from "./utils.js";

const classes = db.collection("classes");


export async function add_class(name: string) {
   const insert_obj = {
    id: gen_id(),
    name: name,
    posts: [],
    teachers: [],
  }
  await classes.insertOne(insert_obj);
  return insert_obj;
}

export async function get_class(id: string) {
  return await classes.findOne({ id });
}


