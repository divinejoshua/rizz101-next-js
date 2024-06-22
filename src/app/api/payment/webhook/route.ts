import usePayment from "@/app/hooks/usePaymentHook";
import { NextRequest, NextResponse } from "next/server";

// POST request
export async function POST (req: NextRequest, res : NextResponse) {

    const { saveTransactionEvent } = usePayment()

    //Get the request body
    let request = await req.json()

    saveTransactionEvent(request)

    //Data response
    let data = {
        success_message : "Rizz101 - webhook",
        success : true,
    }

    //Response
    return NextResponse.json(data, {
        status: 200,
    });
}