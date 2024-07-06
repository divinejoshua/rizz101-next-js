import { ERROR_MESSAGE_INVALID_CHAT_REQUEST } from "@/app/constants/constants";
import useChat from "@/app/hooks/useChatHook";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});


// POST request
export async function POST (req: NextRequest, res : NextResponse) {

    //Hooks
    const { saveChatToDb } = useChat()

    //Get the request body
    let request = await req.formData()

    let text : any = request.get('prompt')

    let threadId : any = request.get('threadId')

    // If no threadId or text
    if (!threadId || !text){
        return NextResponse.json({
            error : true,
            errorMessage : ERROR_MESSAGE_INVALID_CHAT_REQUEST
        }, {
            status: 400,
        });
    }

    let prompt = JSON.parse(text);

    let aiResponse : any = await AIResponder(prompt)

    //Data response
    let data = {
        response : aiResponse,
    }

    //Save chat to database
    saveChatToDb(prompt, aiResponse, threadId)

    //Response
    return NextResponse.json(data, {
        status: 200,
    });
}


// GPT response
async function AIResponder(prompt : any) {

    // System prompt
    let system = {"role": "system", "content": `
        Your name is Rizz101, an relationship expert and coach specialized in giving great texting and flirting tips
        Do not answer any questions that’s not related to Relationships as you are an AI relationships/ texting expert.
        You can also have multiple answers. Return your answer in json
        {
            text : string,
            actualPickUpLines : string[]
        }`
    }
    // Add system to prompt
    prompt.unshift(system);

    //Call GPT
    const completion = await openai.chat.completions.create({
        messages: prompt,
        model: "gpt-4o",
        frequency_penalty : 2.0
    });
    return completion.choices[0].message.content;
}
