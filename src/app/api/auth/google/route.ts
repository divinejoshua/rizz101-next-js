import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { AUTH_PROVIDER_GOOGLE } from "@/app/constants/constants";

// POST request
export async function POST (req: NextRequest, res : NextResponse) {

    //Get the request body
    let request = await req.formData()

    let token = request.get("userIdToken") || ""
    let decode : any = jwtDecode(token.toString());

    // The user Object
    let user = {
        fullName : decode.name,
        email : decode.name,
        authProvider : AUTH_PROVIDER_GOOGLE
    }

    //Data response
    let data = user

    //Response
    return NextResponse.json(data, {
        status: 200,
    });
}