import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { AUTH_PROVIDER_GOOGLE, AUTH_PROVIDER_APPLE, ERROR_MESSAGE_REGISTRATION_MISSING_EMAIL, ERROR_MESSAGE_REGISTRATION_FIREBASE_ERROR } from "@/app/constants/constants";
import useUser from "@/app/hooks/useUserHook";

// POST request
export async function POST (req: NextRequest, res : NextResponse) {

    const { getOrCreateUser } = useUser()

    let response : any


    //Get the request body
    let request = await req.formData()
    let token = request.get("userIdToken") || ""
    let provider = request.get("provider") || ""


    let decode : any = jwtDecode(token.toString());

    let user : any= {
        name : decode.name || "",
        email : decode.email,
        authProvider  : provider
    }

    // Return Error if not email
    if(!user.email) {
        return NextResponse.json({
            error : true,
            errorMessage : ERROR_MESSAGE_REGISTRATION_MISSING_EMAIL
        }, {
            status: 400,
        });
    }


    // If no auth provider
    if(provider !== AUTH_PROVIDER_GOOGLE && provider !== AUTH_PROVIDER_APPLE){
        user.authProvider = null
    }

    // Register the user to database
    try {
        response = await getOrCreateUser(user)
    }catch (error){
        return NextResponse.json({
            error : true,
            errorMessage : ERROR_MESSAGE_REGISTRATION_FIREBASE_ERROR
        }, {
            status: 400,
        });
    }

    //Data response
    let data = response

    //Response
    return NextResponse.json(data, {
        status: 200,
    });
}