import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/taskModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
connect();

export const POST = async (request: NextRequest) => {
  try {
    const { task } = await request.json();
    const userId = getDataFromToken(request);
    const newTask = await new Task({
      task: task,
      creator: userId,
    });

    await newTask.save();

    return NextResponse.json(
      { success: true, message: "New Task Created!", newTask },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
