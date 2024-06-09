import { NextRequest, NextResponse } from "next/server";


// GET request
export async function GET (req: NextRequest, res : NextResponse) {

    //Get the request body
    // let request = await req.formData()

    //Data response
    let data = {
        welcomeText : "Welcomt to Rizz101"
    }

    //Response
    return NextResponse.json(data, {
        status: 200,
    });
}