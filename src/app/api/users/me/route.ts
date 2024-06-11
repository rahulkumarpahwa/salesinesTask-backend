import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/utils/getDataFromToken";
import User from "@/models/userModel";
connect();

export const POST = async (request: NextRequest) => {
  try {
    const userId = await getDataFromToken(request);

    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return NextResponse.json(
        { message: "User Doesn't Exist!" },
        { status: 400 }
      );
    }
    return NextResponse.json({
      message: "User Found SuccessFully!!",
      user,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
