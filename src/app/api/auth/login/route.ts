import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { AUTH_PROVIDER_GOOGLE, AUTH_PROVIDER_APPLE } from "@/app/constants/constants";

// POST request
export async function POST (req: NextRequest, res : NextResponse) {

    //Get the request body
    let request = await req.formData()
    let token = request.get("userIdToken") || ""
    let provider = request.get("provider") || ""

    let decode : any = jwtDecode(token.toString());

    let user : any= {
        name : decode.name,
        email : decode.email,
        authProvider  : provider
    }
    // If no auth provider
    if(provider !== AUTH_PROVIDER_GOOGLE && provider !== AUTH_PROVIDER_APPLE){
        user.authProvider = null
    }

    //Data response
    let data = user

    //Response
    return NextResponse.json(data, {
        status: 200,
    });
}