import db from "./db.js";
import { hash } from "argon2";

const users = db.collection("users");

/*
users: [
  creation_timestamp
  username
  name
  password
  pfp
  classes: []
]
*/

export async function add_user(username: string, name: string, password: string, pfp?: string) {
  //
  return await users.insertOne({
    creation_timestamp: Date.now(),
    username,
    name,
    password: await hash(password),
    pfp,
    classes: [],
  });
}

export async function get_user(username: string) {
  return await users.findOne({
    username,
  }, {
    projection: {
      _id: 0,
    },
  });
}

export async function get_users_in_class(class_id: string) {
  //todo: make sure this works
  return await users.find({
    classes: class_id,
  }).toArray();
}

export async function add_user_to_class(username: string, class_id: string) {
  const { modifiedCount } = await users.updateOne({
    username,
    classes: {
      $nin: [class_id],
    }
  }, {
    $push: {
      classes: class_id,
    }
  });
  return modifiedCount;
}

//does this work?
export async function remove_user_from_class(username: string, class_id: string) {
  const { modifiedCount } = await users.updateOne({
    username,
    classes: {
      $in: [class_id],
    }
  }, {
    $pull: {
      classes: class_id,
    }
  });
  return modifiedCount;
}
