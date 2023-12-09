import db from "./db.js";

const classes = db.collection("classes");


export async function get_user_classes() {
  return await classes.find();
}

export async function get_class(id: string) {
  return await classes.findOne({ id });
}


