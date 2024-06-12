import { NextRequest, NextResponse } from "next/server";

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

// GET request
export async function POST (req: NextRequest, res : NextResponse) {

    //Get the request body
    let request = req.formData()

    //Data response
    let data = {
        welcomeText : "Rizz101 - webhook"
    }

    //Response
    return NextResponse.json(data, {
        status: 200,
    });
}