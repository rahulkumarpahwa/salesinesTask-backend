import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
connect();

export const POST = async (request: NextRequest) => {
  try {
    const { username, password, email } = await request.json();

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User Already Exist! Try To LogIn!" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User SignUp SuccessFully!!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return  NextResponse.json({ error: error.message }, { status: 400 });
  }
};
