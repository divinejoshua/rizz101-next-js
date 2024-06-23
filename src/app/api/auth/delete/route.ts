import { ERROR_MESSAGE_GET_USER_FIREBASE_ERROR, ERROR_MESSAGE_USER_NOT_FOUND } from "@/app/constants/constants";
import useUser from "@/app/hooks/useUserHook";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

// GET request
export async function DELETE (req: NextRequest) {

    //Hooks
    const { deleteUser } = useUser()

    //Request body
    let request = await req.formData()
    let userId = request.get("userId") || ""

    let response : any = {}
    let userEmail : any

    try {
        userEmail = await deleteUser(userId.toString())
    }catch (error){
        return NextResponse.json({
            error : true,
            errorMessage : ERROR_MESSAGE_GET_USER_FIREBASE_ERROR
        }, {
            status: 400,
        });
    }

    // If no user was deleted
    if(!userEmail){
        return NextResponse.json({
            error : true,
            errorMessage : ERROR_MESSAGE_USER_NOT_FOUND
        }, {
            status: 404,
        });
    }


    //Data response
    let data = {
        isDeleted : true,
        success : true,
        email : userEmail
    }

    //Response
    return NextResponse.json(data, {
        status: 200,
    });
}