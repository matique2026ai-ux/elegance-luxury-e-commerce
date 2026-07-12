import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-large-latest",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI fashion stylist assistant for MAISON HERAHIMA, a luxury fashion brand. Help customers choose sizes, colors, styles, and provide fashion advice. Be friendly, knowledgeable, and concise. Respond in the same language the customer uses.",
          },
          ...messages,
        ],
        max_tokens: 500,
      }),
    })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 })
  }
}
