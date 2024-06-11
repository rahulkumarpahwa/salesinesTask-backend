import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/taskModel";
import { connect } from "@/dbConfig/dbConfig";
connect();

export const POST = async (request: NextRequest) => {
  try {
    const { taskId } = await request.json();
    const deletedTask = await Task.findByIdAndDelete(taskId);
    return NextResponse.json(
      { success: true, message: "Task Deleted!", deletedTask },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
