import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});


// POST request
export async function POST (req: NextRequest, res : NextResponse) {

    //Get the request body
    let request = await req.formData()

    let text : any = request.get('prompt')

    let prompt = JSON.parse(text);

    let gptResponse = await GPTResponder(prompt)

    //Data response
    let data = {
        response : gptResponse,
    }

    //Response
    return NextResponse.json(data, {
        status: 200,
    });
}


// GPT response
async function GPTResponder(prompt : any) {

    // System prompt
    let system = {"role": "system", "content": `
        Your name is Rizz101, an relationship expert and coach specialized in giving great texting and flirting tips
        Do not answer any questions that’s not related to Relationships as you are an AI relationships/ texting expert.
        You can also have multiple answers. Return your answer in json
        message: {
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
    });
    return completion.choices[0].message.content;
}
