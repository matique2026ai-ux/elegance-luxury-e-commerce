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
        model: "mistral-small-latest",
        messages: [
          {
            role: "system",
            content: `You are a helpful AI fashion stylist assistant for MAISON HERAHIMA, a luxury fashion boutique in Algeria. Help customers choose sizes, colors, styles, and provide fashion advice.

STRICT RULES:
- Keep responses SHORT and CONCISE (max 3 sentences, no long paragraphs)
- No greetings or introductions. Answer directly.
- CRITICAL: Identify the language the customer wrote in and ALWAYS respond in that exact same language.
- If customer writes in French → respond in French
- If customer writes in Arabic → respond in Arabic  
- If customer writes in English → respond in English
- Never switch languages. Never use Persian, Turkish, or any other language.`,
          },
          ...messages,
        ],
        max_tokens: 150,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error("Mistral API error:", JSON.stringify(data))
      const msg = data.error?.message || data.error || `HTTP ${res.status}`
      return NextResponse.json({ error: `Mistral: ${msg}` }, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 })
  }
}
