import { WEBHOOK_EVENTS_CHARGE_SUCCESS, WEBHOOK_EVENTS_SUBSCRIPTION_NOT_RENEW } from "@/app/constants/constants";
import usePayment from "@/app/hooks/usePaymentHook";
import useUser from "@/app/hooks/useUserHook";
import { NextRequest, NextResponse } from "next/server";

// POST request
export async function POST (req: NextRequest, res : NextResponse) {

    const { saveTransactionEvent } = usePayment()
    const { updateUserSubscription } = useUser()

    //Get the request body
    let request = await req.json()

    let event = request.event
    let email = request.data.customer.email

    // On successful transaction
    if(event == WEBHOOK_EVENTS_CHARGE_SUCCESS){
        let isSubscribed = true
        saveTransactionEvent(request)
        updateUserSubscription(email, isSubscribed)
    }

    // On Subscription cancel
    if(event == WEBHOOK_EVENTS_SUBSCRIPTION_NOT_RENEW){
        let isSubscribed = false
        console.log("Subscription not renewed for "+email)
        updateUserSubscription(email, isSubscribed)
        saveTransactionEvent(request)
    }

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