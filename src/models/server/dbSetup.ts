//? script for structure setup db collection first time (seeding)
import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";

export default async function getOrCreateDB() {
  try {
    await databases.get(db);

    console.log("getOrCreateDB - Database Connected to existing db");
  } catch (error) {
    try {
      await databases.create(db, db);
      console.log("getOrCreateDB - Database Created new db");

      // create collections
      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ]);

      console.log("getOrCreateDB - Collections");
      console.log("getOrCreateDB - Database Connected to new db");
    } catch (error) {
      console.error("Error creating database or collections:", error);
    }
  }

  return databases;
}
