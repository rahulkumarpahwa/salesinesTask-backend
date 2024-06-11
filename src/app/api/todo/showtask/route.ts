import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/taskModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
connect();

export const POST = async (request: NextRequest) => {
  try {
    const userId = getDataFromToken(request);
    const tasks = await Task.find({ creator: userId });
    return NextResponse.json({ success: true, tasks }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
