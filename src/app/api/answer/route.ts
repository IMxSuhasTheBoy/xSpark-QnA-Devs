import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { UserPrefs } from "@/store/Auth";

export async function POST(request: NextRequest) {
  try {
    // extract data from next request
    const { questionId, answer, authorId } = await request.json();

    // edge cases validation

    // create document
    const response = await databases.createDocument(
      db,
      answerCollection,
      ID.unique(),
      {
        content: answer,
        questionId: questionId,
        authorId: authorId,
      }
    );

    // increase authors reputaion
    const prefs = await users.getPrefs<UserPrefs>(authorId);

    await users.updatePrefs<UserPrefs>(authorId, {
      reputation: Number(prefs.reputation) + 1,
    });

    return NextResponse.json(response, {
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Error creating answer" },
      { status: error?.status || error?.code || 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // extract data from next request
    const { answerId } = await request.json();

    // retrieve document
    const answer = await databases.getDocument(db, answerCollection, answerId);

    // validation edge cases

    // delete document
    const response = await databases.deleteDocument(
      db,
      answerCollection,
      answerId
    );

    // decrease authors reputaion
    const prefs = await users.getPrefs<UserPrefs>(answer.authorId);

    await users.updatePrefs<UserPrefs>(answer.authorId, {
      reputation: Number(prefs.reputation) - 1,
    });

    return NextResponse.json(
      { data: response },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Error deleting answer" },
      { status: error?.status || error?.code || 500 }
    );
  }
}
