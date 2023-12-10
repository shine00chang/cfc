import db from "./db.js";
import { gen_id } from "./utils.js";

const classes = db.collection("classes");

export enum PostType {
  Text = "text",
  Link = "link",
  PDF = "pdf",
  YouTube = "youtube",
}

export interface PostSubmitObj {
  author: any;
  content: string;
  timestamp: number; //something something 2038
}

export interface PostObj {
  id: string;
  timestamp: number;
  title: string;
  author: any;
  type: PostType;
  content: any; //for now
  submissions: PostSubmitObj[];
  replies: PostSubmitObj[];
}

export interface ClassObj {
  id: string,
  name: string,
  posts: PostObj[],
  teachers: string[]
}

export async function add_post(class_id: string, title: string, author: any, type: PostType, content: any): Promise<PostObj> {
  const post_obj: PostObj = {
    id: gen_id(),
    timestamp: Date.now(),
    title,
    author,
    type,
    content,
    submissions: [],
    replies: [],
  };
  await classes.updateOne({ id: class_id }, {
    $push: {
      posts: post_obj,
    }
  });
  return post_obj;
}

export async function delete_post(class_id: string, post_id: string) {
  return await classes.updateOne({ id: class_id }, {
    $pull: {
      //todo: make sure this works
      "posts.id": post_id,
    }
  });
}

export async function add_post_reply(class_id: string, post_id: string, author: any, content: string) {
  await classes.updateOne({ id: class_id, "posts.id": post_id }, {
    $push: {
      "posts.$.replies": {
        author,
        content,
        timestamp: Date.now(),
      },
    }
  });
}

export async function add_post_submission(class_id: string, post_id: string, author: any, content: string) {
  await classes.updateOne({ id: class_id, "posts.id": post_id }, {
    $push: {
      "posts.$.submissions": {
        author,
        content,
        timestamp: Date.now(),
      },
    }
  });
}

export async function add_class(name: string, first_teacher): Promise<ClassObj> {
  const insert_obj: ClassObj = {
    id: gen_id(),
    name: name,
    posts: [],
    teachers: [first_teacher],
  }
  await classes.insertOne(insert_obj);
  return insert_obj;
}

export async function get_class(id: string) {
  return await classes.findOne({ id }, {
    projection: {
      _id: 0,
    },
  });
}

export async function delete_class(id: string) {
  return await classes.deleteOne({ id });
}
