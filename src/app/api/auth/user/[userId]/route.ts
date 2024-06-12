import { ERROR_MESSAGE_GET_USER_FIREBASE_ERROR, ERROR_MESSAGE_USER_NOT_FOUND } from "@/app/constants/constants";
import useUser from "@/app/hooks/useUserHook";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

// GET request
export async function GET (req: NextRequest,  { params }: { params: { userId: string } }) {

    //Param
    const userId = params.userId
    //Hooks
    const { getUserById } = useUser()

    let response : any = {}

    // Get the user details from database
    try {
        response = await getUserById(userId)
    }catch (error){
        return NextResponse.json({
            error : true,
            errorMessage : ERROR_MESSAGE_GET_USER_FIREBASE_ERROR
        }, {
            status: 400,
        });
    }

    // If no user was returned
    if(!response?.email){
        return NextResponse.json({
            error : true,
            errorMessage : ERROR_MESSAGE_USER_NOT_FOUND
        }, {
            status: 404,
        });
    }

    //Data response
    let data = response

    //Response
    return NextResponse.json(data, {
        status: 200,
    });
}