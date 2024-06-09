import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";


// GET request
export async function POST (req: NextRequest,  { params }: { params: { userId: string } }) {

    //Get the request body
    let request = await req.formData()
    let name = request.get('name')

    //Param
    const userId = params.userId

    console.log(userId)
    console.log(name)


    //Data response
    let data = {
        welcomeText : "Rizz101 - user details"
    }

    //Response
    return NextResponse.json(data, {
        status: 200,
    });
}