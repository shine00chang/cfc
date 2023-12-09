import db from "./db.js";
import { gen_id } from "./utils.js";

const classes = db.collection("classes");


export async function add_class(name: string) {
  return await classes.insertOne({
    id: gen_id(),
    name: name,
    posts: [],
    teachers: []
  });
}

export async function get_class(id: string) {
  return await classes.findOne({ id });
}


