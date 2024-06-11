import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export const POST = async (request: NextRequest) => {
  try { const { password, email } = await request.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { error: "User Doesn't Exist. Please SignUp!" },
      { status: 400 }
    );
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return NextResponse.json(
      { error: "Please Check Your Credentials!" },
      { status: 400 }
    );
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT!, {
    expiresIn: "1d",
  });

  const response = NextResponse.json(
    { message: "User LoggedIn Successfully!" },
    { status: 200 }
  );

  response.cookies.set("token", token, { secure: true, httpOnly: true });

  return response;
    
  } catch (error:any) {
   console.log(error.message);
   return NextResponse.json({ error: error.message }, { status: 400 });
  }
 
};
