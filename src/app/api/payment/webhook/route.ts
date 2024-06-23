import { WEBHOOK_EVENTS_CHARGE_SUCCESS, WEBHOOK_EVENTS_SUBSCRIPTION_DISABLE, WEBHOOK_EVENTS_SUBSCRIPTION_EXPIRING_CARDS, WEBHOOK_EVENTS_SUBSCRIPTION_INVOICE_PAYMENT_FAILED, WEBHOOK_EVENTS_SUBSCRIPTION_NOT_RENEW } from "@/app/constants/constants";
import usePayment from "@/app/hooks/usePaymentHook";
import useUser from "@/app/hooks/useUserHook";
import { NextRequest, NextResponse } from "next/server";

// POST request
export async function POST (req: NextRequest, res : NextResponse) {

    // Hooks
    const { saveTransactionEvent } = usePayment()
    const { updateUserSubscription } = useUser()

    //Data
    let request : any = await req.json()

    let event : any = request.event
    let email : any = request?.data?.customer?.email

    // On successful transaction
    if(event == WEBHOOK_EVENTS_CHARGE_SUCCESS){
        let isSubscribed = true
        await updateUserSubscription(email, isSubscribed)
        await saveTransactionEvent(request)
    }

    // On Subscription cancel
    if(event == WEBHOOK_EVENTS_SUBSCRIPTION_NOT_RENEW
        || event == WEBHOOK_EVENTS_SUBSCRIPTION_DISABLE
        || event == WEBHOOK_EVENTS_SUBSCRIPTION_EXPIRING_CARDS
        || event == WEBHOOK_EVENTS_SUBSCRIPTION_INVOICE_PAYMENT_FAILED){
        let isSubscribed = false

        // Get email from Webhook event
        if(event == WEBHOOK_EVENTS_SUBSCRIPTION_EXPIRING_CARDS){
            email = request.data[0].customer.email
        }

        await updateUserSubscription(email, isSubscribed)
        await saveTransactionEvent(request)
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